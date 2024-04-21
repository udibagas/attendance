function openForm(data = {}) {
  const modal = new bootstrap.Modal("#formModal");
  const formTitle = document.querySelector("#formModalLabel");
  formTitle.innerText = id ? `Edit Data` : `Tambah Data`;

  const inputElement = {};

  for (let key in data) {
    inputElement[key] = document.querySelector(`[name=${key}]`);
    if (inputElement[key]) {
      inputElement[key].value = data[key];
    }
  }

  modal.show();
}

function save(url, method, data = {}) {
  fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(async (res) => {
      if (!res.ok) throw res;
      const { message, data } = await res.json();
      // TODO: sweet alert & reload table only
      window.location.reload();
    })
    .catch(async (res) => {
      console.log(res);
      if (res.status == 400) {
        const { errors } = await res.json();
        showValidationError(errors);
      }
    });
}

function showValidationError(errors) {
  form.classList.add("was-validated");
  const validation = {};
  // TODO:
  validation.name = document.querySelector("#name-validation");
  validation.ip_address = document.querySelector("#ip_address-validation");

  for (let k in validation) {
    if (errors[k]) {
      inputElement[k].classList.add("is-invalid");
      validation[k].innerText = errors[k].join(", ");
    } else {
      inputElement[k].classList.add("is-valid");
      validation[k].innerText = "";
    }
  }
}

// ADD
document.querySelector("#btn-add").addEventListener("click", (e) => {
  e.preventDefault();
  openForm({});
});

// EDIT
document.querySelectorAll(".btn-edit").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(e.target.href, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        openForm(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// DELETE
document.querySelectorAll(".btn-delete").forEach((el) => {
  el.addEventListener("click", async (e) => {
    e.preventDefault();
    if (confirm("Anda yakin akan menghapus data ini?")) {
      try {
        await fetch(e.target.href, { method: "DELETE" });
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  });
});

// CREATE & UPDATE
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const payload = {};
  for (var [key, value] of data) {
    payload[key] = value || undefined; // prevent empty string
  }

  let method = "POST";
  let url = e.target.action;

  if (payload.id) {
    method = "PUT";
    url += `/${payload.id}`;
  }

  save(url, method, payload);
});
