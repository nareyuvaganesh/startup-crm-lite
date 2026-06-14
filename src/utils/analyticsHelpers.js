export const getStatusDistribution = (leads) => {
  const counts = {};

  leads.forEach((lead) => {
    counts[lead.status] = (counts[lead.status] || 0) + 1;
  });

  return Object.keys(counts).map((status) => ({
    name: status,
    value: counts[status],
  }));
};

export const getMonthlyLeads = (leads) => {
  const months = {};

  leads.forEach((lead) => {
    if (!lead.createdAt) return;

    const month = new Date(
      lead.createdAt
    ).toLocaleString("default", {
      month: "short",
    });

    months[month] = (months[month] || 0) + 1;
  });

  return Object.keys(months).map((month) => ({
    month,
    leads: months[month],
  }));
};

export const getConversionByMonth = (leads) => {
  const months = {};

  leads.forEach((lead) => {
    if (!lead.createdAt) return;

    const month = new Date(
      lead.createdAt
    ).toLocaleString("default", {
      month: "short",
    });

    if (!months[month]) {
      months[month] = {
        total: 0,
        won: 0,
      };
    }

    months[month].total++;

    if (lead.status === "Won") {
      months[month].won++;
    }
  });

  return Object.keys(months).map((month) => ({
    month,
    rate:
      (months[month].won /
        months[month].total) *
      100,
  }));
};