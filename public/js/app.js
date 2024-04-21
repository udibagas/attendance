const form = document.querySelector("form");
const modal = new bootstrap.Modal("#formModal");
const formTitle = document.querySelector("#formModalLabel");

function openForm(data = {}) {
  formTitle.innerText = id ? `Edit Data` : `Tambah Data`;

  for (let key in data) {
    const input = document.querySelector(`[name=${key}]`);
    if (input) {
      input.value = data[key];
    }

    const validation = document.querySelector(`#${key}-validation`);
    if (validation) {
      input.classList.remove("is-valid", "is-invalid");
    }
  }

  // TODO: reset validation

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
  for (let key in form.elements) {
    const el = form.elements.item(key);
    const inputs = ["INPUT", "TEXTAREA", "SELECT"];
    if (inputs.includes(el.tagName)) {
      const validation = document.querySelector(`#${el.name}-validation`);
      if (errors[el.name]) {
        el.classList.add("is-invalid");
        if (validation) {
          validation.innerText = errors[el.name].join(", ");
        }
      } else {
        el.classList.add("is-valid");
        if (validation) {
          validation.innerText = "";
        }
      }
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
        // TODO: reload data
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  });
});

// CREATE & UPDATE
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
