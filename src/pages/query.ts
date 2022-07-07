import { projectsDbId, experimentsDbId, getDatabase } from "src/lib/api";

export const getServerSideProps = async () => {
  const online = true;
  // let projects;
  // let experiments;

  // if (online) {
  //   try {
  //     projects = await getDatabase(projectsDbId);
  //   } catch {
  //     projects = null;
  //   }

  //   try {
  //     experiments = await getDatabase(experimentsDbId);
  //   } catch {
  //     experiments = null;
  //   }
  // } else {
  //   projects = null;
  //   experiments = null;
  // }

  const projects = await getDatabase(projectsDbId);
  const experiments = await getDatabase(experimentsDbId);

  return {
    props: {
      projects,
      experiments,
    },
  };
};
