
import { useState } from "react";
import NoProjectSelected from "./component/NoProjectSelected";
import ProjectSideBar from "./component/ProjectSideBar";
import NewProject from "./component/NewProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  })

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleAddProject(projecData) {
    setProjectState(prevState => {
      const newProject = {
        ...projecData,
        id: Math.random()
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleOnSaveClicked (){

  }



  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar onStartAddProject={handleStartAddProject} projects={projectState.projects}/>
      {content}
    </main>
  );
}

export default App;
