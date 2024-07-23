
import { useState } from "react";
import NoProjectSelected from "./component/NoProjectSelected";
import ProjectSideBar from "./component/ProjectSideBar";
import NewProject from "./component/NewProject";
import SelectedProject from "./component/SelectedProjected";

// experience the problem of prop drilling =) 

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(text) {
    setProjectState(prevState => {
      const taskId = Math.random();

      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
      
        tasks: prevState.tasks.filter(
          (task) => task.id !== id)
      }
    })
  }


  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
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


  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectProject = projectState.projects.find((project) => project.id === projectState.selectedProjectId)

  let content = <SelectedProject
    project={selectProject}
    onDeleteProject={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks} />;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} onCancelAddProject={handleCancelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectState.projects} selectedProjectId={projectState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
