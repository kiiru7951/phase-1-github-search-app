document.getElementById('github-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('search').value;
    
    document.getElementById('user-list').innerHTML = '';
    document.getElementById('repos-list').innerHTML = '';
  
    searchUsers(username);
  });
  
  function searchUsers(username) {
    const url = `https://api.github.com/search/users?q=${username}`;
    fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => displayUsers(data.items))
    .catch(error => console.error('Error:', error));
  }
  
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
  
    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login} Avatar">
        <p>Username: ${user.login}</p>
        <p><a href="${user.html_url}" target="_blank">Profile Link</a></p>
      `;
  
      userItem.addEventListener('click', function() {
        getUserRepos(user.login);
      });
  
      userList.appendChild(userItem);
    });
  }
  
  function getUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => displayRepos(data))
    .catch(error => console.error('Error:', error));
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '<h3>Repositories:</h3>';
  
    const reposUl = document.createElement('ul');
  
    repos.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      reposUl.appendChild(repoItem);
    });
  
    reposList.appendChild(reposUl);
  }
  