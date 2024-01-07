import axios from "axios";
import { subgraphURLs } from "./constant";

const getDataFromSubgraph = async (query, subgraphURL) => {
    try {
        const result = await axios.post(subgraphURL, {
            query,
        });

        console.log(result, "=========result=======")
        return { isSuccess: true, data: result.data.data };
    } catch (error) {
        return { isSuccess: false, data: "" };
    }
};

export const getProjects = async () => {
    const query = `{
        projects(orderBy: blockTime) {
          id
          creator
          projectDeadline
          currentAmount
          currentState
          desc
          filterTags
          goalAmount
          noOfContributors
          projectCoverUrl
          socialUrl
          title
          websiteUrl
        }
      }`;
    try {
        let projects = []
        await Promise.all(
            Object.entries(subgraphURLs).map(async ([key, value]) => {
                const res = await getDataFromSubgraph(query, value);
                console.log(res, "==========res==========")
                if (res.isSuccess) {
                    let index = 0;
                    let projectsList = res.data.projects;
                    projectsList = projectsList.map((project) => { return { ...project, chainId: key, index:index++ } })
                    projects = projects.concat(projectsList);
                }
            })
        )

        return projects
    } catch (e) {
        console.log(e, "=========error in get projects============")
        return [];
    }
};