/**
 * analyticsHelpers.js
 * Provides data processing, filtering, aggregation, and calculation functions for the Advanced Analytics page.
 */

/**
 * getFilteredData
 * Filters the leads array into current and previous period subsets based on the dateRange filter.
 */
export const getFilteredData = (leads, dateRange) => {
  const now = new Date();
  let days = 30; // Default to 30 days

  // Map filters to specific day ranges
  if (dateRange === "Today") {
    days = 1;
  } else if (dateRange === "Weekly") {
    days = 7;
  } else if (dateRange === "Monthly") {
    days = 30;
  } else if (dateRange === "Quarterly") {
    days = 90;
  } else if (dateRange === "Yearly") {
    days = 365;
  }

  // Calculate milliseconds bounds
  const msOffset = days * 24 * 60 * 60 * 1000;
  const currentCutoff = new Date(now.getTime() - msOffset);
  const previousCutoff = new Date(now.getTime() - (2 * msOffset));

  // Filter leads into current and previous collections
  const currentLeads = leads.filter(lead => new Date(lead.createdAt) >= currentCutoff);
  const previousLeads = leads.filter(lead => {
    const time = new Date(lead.createdAt).getTime();
    return time >= previousCutoff.getTime() && time < currentCutoff.getTime();
  });

  return { currentLeads, previousLeads, days };
};

/**
 * calculateKPIs
 * Computes high-level key performance indicators comparing current vs previous period.
 */
export const calculateKPIs = (currentLeads, previousLeads) => {
  const totalLeads = currentLeads.length;
  const prevTotalLeads = previousLeads.length;
  // Lead growth %
  const leadGrowth = prevTotalLeads > 0 ? ((totalLeads - prevTotalLeads) / prevTotalLeads) * 100 : 0;

  // Active Leads: status is not Won and not Lost
  const activeLeads = currentLeads.filter(l => l.status !== "Won" && l.status !== "Lost").length;
  const prevActiveLeads = previousLeads.filter(l => l.status !== "Won" && l.status !== "Lost").length;
  const activeGrowth = prevActiveLeads > 0 ? ((activeLeads - prevActiveLeads) / prevActiveLeads) * 100 : 0;

  // Won Deals: status is Won
  const wonDeals = currentLeads.filter(l => l.status === "Won").length;
  const prevWonDeals = previousLeads.filter(l => l.status === "Won").length;
  const wonGrowth = prevWonDeals > 0 ? ((wonDeals - prevWonDeals) / prevWonDeals) * 100 : 0;

  // Lost Deals: status is Lost
  const lostDeals = currentLeads.filter(l => l.status === "Lost").length;
  const prevLostDeals = previousLeads.filter(l => l.status === "Lost").length;
  const lostGrowth = prevLostDeals > 0 ? ((lostDeals - prevLostDeals) / prevLostDeals) * 100 : 0;

  // Conversion Rate: Won Deals / Total Leads in period
  const conversionRate = totalLeads > 0 ? (wonDeals / totalLeads) * 100 : 0;
  const prevConversionRate = prevTotalLeads > 0 ? (prevWonDeals / prevTotalLeads) * 100 : 0;
  const conversionGrowth = conversionRate - prevConversionRate; // simple absolute point difference

  // Revenue Generated: sum of deal values for Won leads (handling string values just in case)
  const revenue = currentLeads
    .filter(l => l.status === "Won")
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
  const prevRevenue = previousLeads
    .filter(l => l.status === "Won")
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
  const revenueGrowth = prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;

  // Average Response Time: average of responseTime field (hours)
  const leadsWithResponse = currentLeads.filter(l => l.responseTime !== undefined);
  const avgResponse = leadsWithResponse.length > 0
    ? leadsWithResponse.reduce((sum, l) => sum + Number(l.responseTime), 0) / leadsWithResponse.length
    : 0;
  const prevLeadsWithResponse = previousLeads.filter(l => l.responseTime !== undefined);
  const prevAvgResponse = prevLeadsWithResponse.length > 0
    ? prevLeadsWithResponse.reduce((sum, l) => sum + Number(l.responseTime), 0) / prevLeadsWithResponse.length
    : 0;
  const responseGrowth = prevAvgResponse > 0 ? ((avgResponse - prevAvgResponse) / prevAvgResponse) * 100 : 0;

  return {
    totalLeads, leadGrowth,
    activeLeads, activeGrowth,
    wonDeals, wonGrowth,
    lostDeals, lostGrowth,
    conversionRate, conversionGrowth,
    revenue, revenueGrowth,
    avgResponse, responseGrowth
  };
};

/**
 * getLeadGrowthData
 * Prepares data for Line Chart: Lead growth over time, grouped by date or month depending on duration.
 */
export const getLeadGrowthData = (currentLeads, days) => {
  const dates = {};
  
  currentLeads.forEach(lead => {
    const d = new Date(lead.createdAt);
    let key = "";
    
    if (days <= 7) {
      // Group by weekday name
      key = d.toLocaleDateString("en-US", { weekday: "short" });
    } else if (days <= 90) {
      // Group by date string (e.g., "Jun 15")
      key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else {
      // Group by month name (e.g., "Jun")
      key = d.toLocaleDateString("en-US", { month: "short" });
    }
    
    dates[key] = (dates[key] || 0) + 1;
  });

  // Sort dates chronologically based on days offset
  const sortedKeys = Object.keys(dates).sort((a, b) => {
    // Helper to find the earliest lead timestamp matching this key
    const getFirstTime = (keyStr) => {
      const match = currentLeads.find(l => {
        const d = new Date(l.createdAt);
        let checkKey = "";
        if (days <= 7) checkKey = d.toLocaleDateString("en-US", { weekday: "short" });
        else if (days <= 90) checkKey = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        else checkKey = d.toLocaleDateString("en-US", { month: "short" });
        return checkKey === keyStr;
      });
      return match ? new Date(match.createdAt).getTime() : 0;
    };
    return getFirstTime(a) - getFirstTime(b);
  });

  let cumulative = 0;
  const chartData = sortedKeys.map(key => {
    cumulative += dates[key];
    return {
      name: key,
      "New Leads": dates[key],
      "Total Leads": cumulative,
    };
  });

  // Calculate highest & lowest performing categories
  let maxLeads = -1, minLeads = Infinity;
  let highestCategory = "N/A", lowestCategory = "N/A";
  
  chartData.forEach(item => {
    if (item["New Leads"] > maxLeads) {
      maxLeads = item["New Leads"];
      highestCategory = item.name;
    }
    if (item["New Leads"] < minLeads) {
      minLeads = item["New Leads"];
      lowestCategory = item.name;
    }
  });

  return {
    chartData,
    highestCategory,
    lowestCategory,
    total: currentLeads.length,
  };
};

/**
 * getStatusData
 * Prepares data for Bar Chart: Leads by status.
 */
export const getStatusData = (currentLeads, previousLeads) => {
  const statuses = ["New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"];
  const counts = {};
  const prevCounts = {};
  
  statuses.forEach(s => {
    counts[s] = 0;
    prevCounts[s] = 0;
  });

  currentLeads.forEach(l => {
    if (statuses.includes(l.status)) counts[l.status]++;
  });

  previousLeads.forEach(l => {
    if (statuses.includes(l.status)) prevCounts[l.status]++;
  });

  const chartData = statuses.map(s => ({
    name: s,
    value: counts[s],
    growth: prevCounts[s] > 0 ? ((counts[s] - prevCounts[s]) / prevCounts[s]) * 100 : 0
  }));

  let highestCount = -1, lowestCount = Infinity;
  let highestCategory = "N/A", lowestCategory = "N/A";

  chartData.forEach(item => {
    if (item.value > highestCount) {
      highestCount = item.value;
      highestCategory = item.name;
    }
    if (item.value < lowestCount && item.value > 0) {
      lowestCount = item.value;
      lowestCategory = item.name;
    }
  });
  if (lowestCategory === "N/A" && chartData.length > 0) {
    lowestCategory = chartData.find(item => item.value === 0)?.name || "N/A";
  }

  return {
    chartData,
    highestCategory,
    lowestCategory,
    total: currentLeads.length
  };
};

/**
 * getSourceData
 * Prepares data for Pie Chart: Lead distribution by source.
 */
export const getSourceData = (currentLeads, previousLeads) => {
  const sources = ["Website", "Referral", "LinkedIn", "Email Campaign", "Cold Call"];
  const counts = {};
  const prevCounts = {};

  sources.forEach(s => {
    counts[s] = 0;
    prevCounts[s] = 0;
  });

  currentLeads.forEach(l => {
    const src = l.source || "Website";
    if (sources.includes(src)) counts[src]++;
  });

  previousLeads.forEach(l => {
    const src = l.source || "Website";
    if (sources.includes(src)) prevCounts[src]++;
  });

  const total = currentLeads.length;
  const chartData = sources.map(s => ({
    name: s,
    value: counts[s],
    percentage: total > 0 ? ((counts[s] / total) * 100).toFixed(1) : 0,
    growth: prevCounts[s] > 0 ? ((counts[s] - prevCounts[s]) / prevCounts[s]) * 100 : 0
  })).filter(item => item.value > 0);

  let highestCount = -1, lowestCount = Infinity;
  let highestCategory = "N/A", lowestCategory = "N/A";

  chartData.forEach(item => {
    if (item.value > highestCount) {
      highestCount = item.value;
      highestCategory = item.name;
    }
    if (item.value < lowestCount) {
      lowestCount = item.value;
      lowestCategory = item.name;
    }
  });

  return {
    chartData,
    highestCategory,
    lowestCategory,
    total
  };
};

/**
 * getConversionTrendData
 * Prepares data for Area Chart: Monthly conversion trends.
 */
export const getConversionTrendData = (currentLeads) => {
  const months = {};

  currentLeads.forEach(lead => {
    const d = new Date(lead.createdAt);
    const month = d.toLocaleDateString("en-US", { month: "short" });
    
    if (!months[month]) {
      months[month] = { total: 0, won: 0 };
    }
    months[month].total++;
    if (lead.status === "Won") {
      months[month].won++;
    }
  });

  // Re-order months chronologically
  const sortedMonths = Object.keys(months).sort((a, b) => {
    const getFirstTime = (m) => {
      const match = currentLeads.find(l => new Date(l.createdAt).toLocaleDateString("en-US", { month: "short" }) === m);
      return match ? new Date(match.createdAt).getTime() : 0;
    };
    return getFirstTime(a) - getFirstTime(b);
  });

  const chartData = sortedMonths.map(m => ({
    name: m,
    rate: Number(((months[m].won / months[m].total) * 100).toFixed(1)),
    total: months[m].total,
    won: months[m].won
  }));

  let highestRate = -1, lowestRate = Infinity;
  let highestCategory = "N/A", lowestCategory = "N/A";

  chartData.forEach(item => {
    if (item.rate > highestRate) {
      highestRate = item.rate;
      highestCategory = item.name;
    }
    if (item.rate < lowestRate) {
      lowestRate = item.rate;
      lowestCategory = item.name;
    }
  });

  return {
    chartData,
    highestCategory: `${highestCategory} (${highestRate}%)`,
    lowestCategory: `${lowestCategory} (${lowestRate === Infinity ? 0 : lowestRate}%)`,
    total: currentLeads.filter(l => l.status === "Won").length
  };
};

/**
 * getFunnelData
 * Prepares data for Funnel Chart: Sales pipeline progression.
 * Standard pipeline flow: New -> Contacted -> Meeting Scheduled -> Proposal Sent -> Won
 */
export const getFunnelData = (currentLeads) => {
  // Funnel counts show progression: a lead at a later stage has progressed past the earlier stages.
  const stageNew = currentLeads.length;
  const stageContacted = currentLeads.filter(l => ["Contacted", "Meeting Scheduled", "Proposal Sent", "Won"].includes(l.status)).length;
  const stageMeeting = currentLeads.filter(l => ["Meeting Scheduled", "Proposal Sent", "Won"].includes(l.status)).length;
  const stageProposal = currentLeads.filter(l => ["Proposal Sent", "Won"].includes(l.status)).length;
  const stageWon = currentLeads.filter(l => l.status === "Won").length;

  const chartData = [
    { name: "New Leads", value: stageNew, fill: "#3b82f6" },
    { name: "Contacted", value: stageContacted, fill: "#60a5fa" },
    { name: "Meeting Scheduled", value: stageMeeting, fill: "#a78bfa" },
    { name: "Proposal Sent", value: stageProposal, fill: "#f472b6" },
    { name: "Deals Won", value: stageWon, fill: "#34d399" }
  ];

  const highestCategory = "New Leads";
  const lowestCategory = "Deals Won";
  const conversionRate = stageNew > 0 ? ((stageWon / stageNew) * 100).toFixed(1) : 0;

  return {
    chartData,
    highestCategory,
    lowestCategory: `${lowestCategory} (${conversionRate}% overall conversion)`,
    total: stageNew
  };
};

/**
 * getDonutData
 * Prepares data for Donut Chart: Conversion Rate Breakdown (Won vs Lost vs In Progress).
 */
export const getDonutData = (currentLeads) => {
  const won = currentLeads.filter(l => l.status === "Won").length;
  const lost = currentLeads.filter(l => l.status === "Lost").length;
  const active = currentLeads.filter(l => l.status !== "Won" && l.status !== "Lost").length;

  const chartData = [
    { name: "Won Deals", value: won, fill: "#10b981" },
    { name: "Lost Deals", value: lost, fill: "#ef4444" },
    { name: "In Progress", value: active, fill: "#f59e0b" }
  ].filter(item => item.value > 0);

  const total = currentLeads.length;
  
  let maxVal = -1;
  let highestCategory = "N/A";
  chartData.forEach(item => {
    if (item.value > maxVal) {
      maxVal = item.value;
      highestCategory = item.name;
    }
  });

  const lowestCategory = chartData.reduce((lowest, item) => item.value < lowest.value ? item : lowest, chartData[0] || { name: "N/A" }).name;

  return {
    chartData,
    highestCategory,
    lowestCategory,
    total
  };
};

/**
 * getStackedBarData
 * Prepares data for Stacked Bar Chart: Monthly leads by source.
 */
export const getStackedBarData = (currentLeads) => {
  const monthlySources = {};
  const sources = ["Website", "Referral", "LinkedIn", "Email Campaign", "Cold Call"];

  currentLeads.forEach(lead => {
    const d = new Date(lead.createdAt);
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const src = lead.source || "Website";

    if (!monthlySources[month]) {
      monthlySources[month] = { name: month };
      sources.forEach(s => {
        monthlySources[month][s] = 0;
      });
    }
    
    if (sources.includes(src)) {
      monthlySources[month][src]++;
    }
  });

  // Re-order months chronologically
  const sortedMonths = Object.keys(monthlySources).sort((a, b) => {
    const getFirstTime = (m) => {
      const match = currentLeads.find(l => new Date(l.createdAt).toLocaleDateString("en-US", { month: "short" }) === m);
      return match ? new Date(match.createdAt).getTime() : 0;
    };
    return getFirstTime(a) - getFirstTime(b);
  });

  const chartData = sortedMonths.map(m => monthlySources[m]);

  // Find highest & lowest sources overall
  const sourceTotals = {};
  sources.forEach(s => { sourceTotals[s] = 0; });
  currentLeads.forEach(l => {
    const src = l.source || "Website";
    if (sources.includes(src)) sourceTotals[src]++;
  });

  let maxSrc = -1, minSrc = Infinity;
  let highestCategory = "N/A", lowestCategory = "N/A";
  
  sources.forEach(s => {
    if (sourceTotals[s] > maxSrc) {
      maxSrc = sourceTotals[s];
      highestCategory = s;
    }
    if (sourceTotals[s] < minSrc) {
      minSrc = sourceTotals[s];
      lowestCategory = s;
    }
  });

  return {
    chartData,
    highestCategory,
    lowestCategory,
    total: currentLeads.length
  };
};

/**
 * generateInsights
 * Computes AI insights about lead sources, conversion rates, bottlenecks, and growth trends.
 */
export const generateInsights = (currentLeads, kpis) => {
  // 1. Identify Best Lead Source
  const sourceRevenue = {};
  const sourceCount = {};
  currentLeads.forEach(l => {
    const src = l.source || "Website";
    sourceCount[src] = (sourceCount[src] || 0) + 1;
    if (l.status === "Won") {
      sourceRevenue[src] = (sourceRevenue[src] || 0) + Number(l.value || 0);
    }
  });

  let bestSource = "Website";
  let maxRevenue = -1;
  Object.keys(sourceRevenue).forEach(src => {
    if (sourceRevenue[src] > maxRevenue) {
      maxRevenue = sourceRevenue[src];
      bestSource = src;
    }
  });

  // 2. Identify Most Successful Lead Status
  // Since "Won" is the final goal, what status prior to Won has the most leads?
  const statusCount = {};
  currentLeads.forEach(l => {
    statusCount[l.status] = (statusCount[l.status] || 0) + 1;
  });
  
  let bottleneck = "Proposal Sent";
  if ((statusCount["Proposal Sent"] || 0) > (statusCount["Won"] || 0) * 1.5) {
    bottleneck = "Proposal Sent -> Won (High drop-off between proposals and won deals)";
  } else if ((statusCount["Meeting Scheduled"] || 0) > (statusCount["Proposal Sent"] || 0) * 1.5) {
    bottleneck = "Meeting Scheduled -> Proposal Sent (Meetings not translating to formal proposals)";
  } else if ((statusCount["Contacted"] || 0) > (statusCount["Meeting Scheduled"] || 0) * 2) {
    bottleneck = "Contacted -> Meeting Scheduled (Difficulty booking meetings with contacted leads)";
  } else {
    bottleneck = "New -> Contacted (Leads are sitting in 'New' without initial response)";
  }

  // 3. Formulate Recommendations
  const recommendations = [];
  if (kpis.avgResponse > 8) {
    recommendations.push("Your average response time is currently " + kpis.avgResponse.toFixed(1) + " hours. Shortening this response window below 2 hours can increase conversion by up to 50%.");
  } else {
    recommendations.push("Response time is excellent (" + kpis.avgResponse.toFixed(1) + " hours average). Keep responding to new leads promptly to sustain high engagement.");
  }

  if (bestSource) {
    recommendations.push("Allocate more marketing budget towards **" + bestSource + "**, which has generated the highest total revenue ($" + maxRevenue.toLocaleString() + ") this period.");
  }

  if (statusCount["Meeting Scheduled"] > statusCount["Proposal Sent"] * 1.8) {
    recommendations.push("Provide your sales team with additional proposal-writing support. There is a clear bottleneck converting scheduled meetings into formal proposals.");
  } else {
    recommendations.push("Focus on lead qualifying criteria at the entry level to avoid spending resources on unqualified cold calls.");
  }

  // 4. Monthly Growth Trend Summarization
  let growthSummary = "Leads remained stable compared to the previous period.";
  if (kpis.leadGrowth > 5) {
    growthSummary = `Leads increased by ${kpis.leadGrowth.toFixed(1)}% compared to the previous period, showing positive pipeline expansion.`;
  } else if (kpis.leadGrowth < -5) {
    growthSummary = `Lead generation has declined by ${Math.abs(kpis.leadGrowth).toFixed(1)}%. Review marketing campaigns or lead sources.`;
  }

  return {
    bestSource: `${bestSource} ($${maxRevenue.toLocaleString()} Revenue)`,
    bottleneck,
    growthSummary,
    recommendations
  };
};