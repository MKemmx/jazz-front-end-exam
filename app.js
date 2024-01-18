$(document).ready(function () {
  const mockData = [
    {
      sellerId: "A3P5ROKL5A1OLE",
      sellerName: "Amazon",
      winRatePercentage: 91,
      hasFba: true,
      ratingPercentage: 0,
      ratingCount: 0,
      country: 0,
      lastWonUTC: 1704714000000,
      winDurationSeconds: 5394488,
    },
    {
      sellerId: "A2RV5RVII6YBBL",
      sellerName: "ToyBarnhaus",
      winRatePercentage: 4,
      hasFba: false,
      ratingPercentage: 96,
      ratingCount: 993,
      country: 0,
      lastWonUTC: 1704740460000,
      winDurationSeconds: 210060,
    },
    {
      sellerId: "A1F7JBVYMUZP1T",
      sellerName: "World Wide Shopping Mall Ltd",
      winRatePercentage: 1,
      hasFba: false,
      ratingPercentage: 97,
      ratingCount: 32239,
      country: 0,
      lastWonUTC: 1700083080000,
      winDurationSeconds: 78360,
    },
    {
      sellerId: "AHVWQNCGHTOW9",
      sellerName: "martzon",
      winRatePercentage: 1,
      hasFba: true,
      ratingPercentage: 100,
      ratingCount: 11,
      country: 0,
      lastWonUTC: 1698155040000,
      winDurationSeconds: 77520,
    },
    {
      sellerId: "A23P07F7BS9WLE",
      sellerName: "AUTHENTIC WORLD",
      winRatePercentage: 1,
      hasFba: false,
      ratingPercentage: 78,
      ratingCount: 499,
      country: 0,
      lastWonUTC: 1703261280000,
      winDurationSeconds: 52440,
    },
    {
      sellerId: "A2HCR73XB4YG06",
      sellerName: "EON ESSENTIALS",
      winRatePercentage: 1,
      hasFba: true,
      ratingPercentage: 100,
      ratingCount: 14,
      country: 0,
      lastWonUTC: 1703955720000,
      winDurationSeconds: 49320,
    },
    {
      sellerId: "A39QOY7M7EVMGN",
      sellerName: "CWD Selling",
      winRatePercentage: 0,
      hasFba: true,
      ratingPercentage: 100,
      ratingCount: 11,
      country: 0,
      lastWonUTC: 1697101080000,
      winDurationSeconds: 25920,
    },
    {
      sellerId: "A3VLEFR93GQMDN",
      sellerName: "YURRC (2 DAY DELIVERY)",
      winRatePercentage: 0,
      hasFba: true,
      ratingPercentage: 93,
      ratingCount: 95,
      country: 0,
      lastWonUTC: 1699873440000,
      winDurationSeconds: 9960,
    },
    {
      sellerId: "A3E3MOWEGSSQUC",
      sellerName: "SHAW'S STUFF",
      winRatePercentage: 0,
      hasFba: true,
      ratingPercentage: 0,
      ratingCount: 0,
      country: 0,
      lastWonUTC: 1699912320000,
      winDurationSeconds: 5400,
    },
    {
      sellerId: "AAC030W8STTTI",
      sellerName: "Wilkie Independent Trader",
      winRatePercentage: 0,
      hasFba: true,
      ratingPercentage: 99,
      ratingCount: 112,
      country: 0,
      lastWonUTC: 1697751120000,
      winDurationSeconds: 4320,
    },
  ];

  $("#sellerTable").DataTable({
    resposive: true,
    info: false,
    ordering: false,
    crossDomain: true,
    dataType: "jsonp",
    crossDomain: true,
    ajax: {
      url: "https://sqlvaeylo42eahnl2u.blob.core.windows.net/temp/buybox.json",
      dataSrc: "data",
      error: function (xhr, errorType, exception) {
        $("#sellerTable").DataTable().clear().rows.add(mockData).draw();
      },
    },
    columns: [
      //   { data: "sellerId", title: "Seller ID" },
      { data: "sellerName", title: "Name" },
      //   { data: "winRatePercentage", title: "Win Rate Pertcentage" },
      //   { data: "hasFba", title: "FBA Status" },
      {
        data: "ratingPercentage",
        title: "Rating",
        render: (data, type, row) => {
          return `<span > ${data}% </span>`;
        },
      },
      {
        data: "ratingCount",
        title: "Review",
        render: function (data, type, row) {
          return parseFloat(data).toLocaleString();
        },
      },
      //   { data: "country", title: "Country" },
      {
        data: "lastWonUTC",
        title: "Last Won",
        render: function (data, type, row) {
          return `<span >${timeToDate(data)}</span>`;
        },
      },
      {
        title: "Time Period",
        render: function (data, type, row) {
          const formattedDate = new Date(row.lastWonUTC).toLocaleString(
            "en-US",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          );
          const timeAgo = convertTimestampToAgo(row.lastWonUTC);
          return `<span title="${formattedDate}">${timeAgo}</span>`;
        },
      },
    ],
    dom: "Brtip",
    paging: true,
    pageLength: 5,
  });

  function timeToDate(timestamp) {
    const dateObject = new Date(timestamp);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  function convertTimestampToAgo(timestamp) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDifference = currentTime - Math.floor(timestamp / 1000);
    if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 3600) {
      const minutesAgo = Math.floor(timeDifference / 60);
      return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 86400) {
      const hoursAgo = Math.floor(timeDifference / 3600);
      return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 2592000) {
      const daysAgo = Math.floor(timeDifference / 86400);
      return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 31536000) {
      const monthsAgo = Math.floor(timeDifference / 2592000);
      return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
    } else {
      const yearsAgo = Math.floor(timeDifference / 31536000);
      return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
    }
  }
});
