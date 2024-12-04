const fetchButton = document.getElementById("fetchButton");
const usersContainer = document.getElementById("usersContainer");

fetchButton.addEventListener("click", fetchUsersData);

function createUserCard(user) {
  const userCard = document.createElement("div");
  userCard.className = "user-card";

  userCard.innerHTML = `
        <img src="${user.picture.large}" alt="User photo" class="user-image">
        <div class="user-info">
            <div class="user-name">${user.name.first} ${user.name.last}</div>
            <div class="user-location">${user.location.city}, ${user.location.country}</div>
            <div class="user-postcode">Індекс: ${user.location.postcode}</div>
        </div>
    `;

  return userCard;
}

function fetchUsersData() {
  usersContainer.innerHTML = "";

  fetchButton.disabled = true;
  fetchButton.textContent = "Завантаження...";

  const requests = Array(5)
    .fill()
    .map(() =>
      fetch("https://randomuser.me/api").then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
    );

  Promise.all(requests)
    .then((results) => {
      const users = results.map((result) => result.results[0]);

      users.forEach((user) => {
        const userCard = createUserCard(user);
        usersContainer.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching users data:", error);
      alert("Помилка при отриманні даних користувачів");
    })
    .finally(() => {
      fetchButton.disabled = false;
      fetchButton.textContent = "Отримати дані користувачів";
    });
}
