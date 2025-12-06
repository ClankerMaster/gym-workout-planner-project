const API_BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  loadWorkouts();
  setupForm();
});

function setupForm() {
  const form = document.getElementById("workout-form");
  const error = document.getElementById("form-error");
  const success = document.getElementById("form-success");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    error.textContent = "";
    success.textContent = "";

    const data = {
      memberName: form.memberName.value.trim(),
      date: form.date.value,
      type: form.type.value,
      duration: Number(form.duration.value),
      intensity: Number(form.intensity.value),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/workouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add workout");
      success.textContent = "Workout added!";
      form.reset();
      loadWorkouts();
    } catch (err) {
      error.textContent = "Something went wrong.";
    }
  });
}

async function loadWorkouts() {
  const tbody = document.getElementById("workout-tbody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(`${API_BASE_URL}/api/workouts`);
    const data = await res.json();

    data.forEach((w) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${w.member_name}</td>
        <td>${w.date}</td>
        <td>${w.type}</td>
        <td>${w.duration}</td>
        <td>${w.intensity}</td>
      `;
      tbody.appendChild(row);
    });
  } catch {
    tbody.innerHTML = "<tr><td colspan='5'>Failed to load workouts.</td></tr>";
  }
}