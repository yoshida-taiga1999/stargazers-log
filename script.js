const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");

function createRepositoryCard(repository) {
  const item = document.createElement("li");
  item.className = "repository-card";

  const heading = document.createElement("h3");
  const link = document.createElement("a");
  link.href = repository.url;
  link.textContent = repository.name;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  heading.append(link);

  const fullName = document.createElement("p");
  fullName.className = "repository-name";
  fullName.textContent = repository.full_name;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const date = document.createElement("time");
  date.className = "repository-date";
  date.dateTime = repository.starred_at;
  date.textContent = `Starred ${new Date(`${repository.starred_at}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}`;

  item.append(heading, fullName, description, date);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
    status.textContent = repositories.length
      ? `${repositories.length} repositories`
      : "No starred repositories yet.";
  } catch (error) {
    status.textContent = "Repositories could not be loaded. Please try again later.";
    console.error("Failed to load starred repositories:", error);
  }
}

loadRepositories();
