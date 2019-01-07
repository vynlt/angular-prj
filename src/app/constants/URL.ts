export const URL = {
    root: "http://toddenergy.australiasoutheast.cloudapp.azure.com:8080/",
    areaRoute: "areas",
    allIORoute: "ios",
    allIOQuery: "$expand=Area,Status,RankingCategory,RankLevel,IOStakeHolders&$filter=(Status%2FName%20eq%20%27Draft%27%20or%20Status%2FName%20eq%20%27Submitted%27%20or%20Status%2FName%20eq%20%27Ready%20For%20Review%27%20or%20Status%2FName%20eq%20%27Ready%20For%20Approval%27%20or%20Status%2FName%20eq%20%27Approved%27%20or%20Status%2FName%20eq%20%27Deferred%27%20or%20Status%2FName%20eq%20%27Requires%20Action%27%20or%20Status%2FName%20eq%20%27Cancelled%27)&$count=true&$top=400&$skip=0&$orderby=Id%20desc,Status%2FSortOrder",
  }