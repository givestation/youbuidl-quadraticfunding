import axios from "axios";
import { subgraphURLs } from "./constant";

const getDataFromSubgraph = async (query, subgraphURL) => {
    try {
        const result = await axios.post(subgraphURL, {
            query,
        });

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
          qfRoundID
          qfMatched
        }
        qfrounds(first: 1, orderBy: blockTime, orderDirection: desc) {
          id
          amount
          totalRootSum
          startTime
          endTime
        }
      }`;
    try {
        let projects = []
        await Promise.all(
            Object.entries(subgraphURLs).map(async ([key, value]) => {
                const res = await getDataFromSubgraph(query, value);
                if (res.isSuccess) {
                    let index = 0;
                    let projectsList = res.data.projects;
                    const qfRounds = res.data.qfrounds;
                    const qfRound = qfRounds.length > 0 ? qfRounds[0] : null;

                    projectsList = projectsList.map((project) => {
                        const currentTime = Math.floor(Date.now() / 1000)
                        const isFinished = currentTime <= +(project.projectDeadline);

                        if (qfRound && qfRound.id == project.qfRoundID) {
                            const isOnQF = currentTime >= +(qfRound.startTime) && currentTime <= +(qfRound.endTime);
                            return { ...project, chainId: key, index: index++, isFinished: isFinished, isOnQF: isOnQF, matchingPool: qfRound.amount, qfRaised: project.qfMatched / qfRound.totalRootSum * qfRound.amount }
                        }

                        return { ...project, chainId: key, index: index++, isFinished: isFinished, isOnQF: false, matchingPool: 0, qfRaised: 0 }
                    }
                    )
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

export const getProject = async (projectContractAddress, chainId) => {
    const query = `{
        project(id: "${projectContractAddress}") {
          id
          desc
          currentState
          currentAmount
          creator
          filterTags
          goalAmount
          noOfContributors
          projectCoverUrl
          projectDeadline
          qfRoundID
          qfMatched
          socialUrl
          githubUrl
          title
          websiteUrl
        }
        qfrounds(first: 1, orderBy: blockTime, orderDirection: desc) {
          id
          amount
          totalRootSum
          startTime
          endTime
        }
      }`;

    try {
        const res = await getDataFromSubgraph(query, subgraphURLs[chainId]);
        if (res.isSuccess) {
            const project = res.data.project;
            if (project) {
                const qfRounds = res.data.qfrounds;
                const qfRound = qfRounds.length > 0 ? qfRounds[0] : null;
                if (qfRound && qfRound.id == project.qfRoundID) {
                    const currentTime = Math.floor(Date.now() / 1000)
                    const isOnQF = currentTime >= +(qfRound.startTime) && currentTime <= +(qfRound.endTime);
                    return { ...project, isOnQF: isOnQF, matchingPool: qfRound.amount,  qfRaised: project.qfMatched / qfRound.totalRootSum * qfRound.amount}
                }

                return { ...project, isOnQF: false, matchingPool: 0 };
            }
            return null
        }
        return null;
    } catch (e) {
        console.log(e, "=========error in get projects============")
        return [];
    }
}

export const getQFRounds = async () => {
    const query = `{
        qfrounds(first: 1, orderBy: blockTime, orderDirection: desc) {
            id
            title
            imgUrl
            desc
            amount
            token
            projectNum
            startTime
            endTime
        }
      }`;
    try {
        let qfRoundsList = []
        await Promise.all(
            Object.entries(subgraphURLs).map(async ([key, value]) => {
                const res = await getDataFromSubgraph(query, value);
                if (res.isSuccess) {
                    const qfRounds = res.data.qfrounds;
                    if (qfRounds.length > 0) {
                        const currentTime = Math.floor(Date.now() / 1000)
                        let leftTime;
                        if (currentTime >= +qfRounds[0].endTime) {
                            leftTime = 0;
                        } else {
                            leftTime = +qfRounds[0].endTime - currentTime;
                        }

                        const daysLeft = Math.floor(leftTime / (24 * 60 * 60));
                        const hoursLeft = Math.floor((leftTime % (24 * 60 * 60)) / 3600);
                        qfRoundsList.push({ ...qfRounds[0], chainId: key, leftDays: daysLeft, leftHours: hoursLeft });
                    }
                }
            })
        )

        return qfRoundsList
    } catch (e) {
        console.log(e, "=========error in get qfRoundsList============")
        return [];
    }
};