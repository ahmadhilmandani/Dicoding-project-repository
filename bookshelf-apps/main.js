const submit = document.getElementById("bookSubmit")
const judulBuku = document.getElementById("inputBookTitle")
const penulisBuku = document.getElementById("inputBookAuthor")
const tahunTerbit = document.getElementById("inputBookYear")
const genreBuku = document.getElementById("genreInput")
const sudahDibaca = document.getElementById("inputBookIsComplete")
const bookShelftBelumSelesai = document.getElementById("incompleteBookshelfList");
const bookShelftSelesai = document.getElementById("completeBookshelfList");


let index = 0
const cekLokalStorage = () => {
    index = Object.keys(localStorage);
}

const tampilkanBukuTerbaru = (param_index = index[length.length - 1]) => {

    const divBaru = document.createElement('div');
    let ambil_data = JSON.parse(localStorage.getItem(param_index));

    divBaru.innerHTML =
        "<p class = judul>" + ambil_data.judul + "</p>" +
        "<p class = penulis>" + ambil_data.penulis + "</p>" +
        "<p class = tahun >" + ambil_data.tahunTerbit + "</p>" +
        "<p class = genre>" + "<span>" + ambil_data.genre + "</span>" + "</p>" +
        "<div class= ubah value=" + param_index + "><i class=material-symbols-outlined>edit</i></div >" +
        "<div class= hapus value=" + param_index + "><i class=material-symbols-outlined>delete</i></div>" +
        "<div value=" + param_index + " data-selesai= " + ambil_data.selesai + "><i class=material-symbols-outlined>priority</i></div>"

    if (ambil_data.selesai == false) {
        bookShelftBelumSelesai.appendChild(divBaru);

    } else {
        bookShelftSelesai.appendChild(divBaru);
    }
    divBaru.setAttribute("id", param_index)
};

const tampilkanSemuaBuku = () => {
    let i = 0;
    cekLokalStorage()
    while (index[i] != null) {
        tampilkanBukuTerbaru(index[i]);
        i++
    }
};

document.addEventListener("DOMContentLoaded", tampilkanSemuaBuku());

const tombolUbahBuku = document.querySelectorAll(".ubah")
const tombolHapusBuku = document.querySelectorAll(".hapus")
const tombolSelesai = document.querySelectorAll("div[data-selesai]")

const containerUbah = document.getElementById("container_ubah");
const ubah = document.getElementById("bookUbah")

const simpanBuku = () => {
    const id = new Date().getTime();

    const bukuBaru = {
        judul: judulBuku.value,
        penulis: penulisBuku.value,
        tahunTerbit: tahunTerbit.value,
        genre: genreBuku.value,
        selesai: sudahDibaca.checked
    }

    localStorage.setItem(id, JSON.stringify(bukuBaru));
}

for (let i = 0; i < tombolUbahBuku.length; i++) {
    tombolUbahBuku[i].addEventListener('click', () => {
        containerUbah.style.display = ""
        const ubahJudulBuku = document.getElementById("ubahBookTitle")
        const ubahPenulisBuku = document.getElementById("ubahBookAuthor")
        const ubahTahunTerbit = document.getElementById("ubahBookYear")
        const ubahGenreBuku = document.getElementById("genreUbah")
        const ubahSudahDibaca = document.getElementById("ubahBookIsComplete")

        const bukuYangTerkenaAksi = document.getElementById(tombolSelesai[i].getAttribute("value"));

        const paramIndex = bukuYangTerkenaAksi.getAttribute("id")

        ubah.addEventListener('click', () => {
            const bukuBaru = {
                judul: ubahJudulBuku.value,
                penulis: ubahPenulisBuku.value,
                tahunTerbit: ubahTahunTerbit.value,
                genre: ubahGenreBuku.value,
                selesai: ubahSudahDibaca.checked
            }

            localStorage.removeItem(paramIndex);
            localStorage.setItem(paramIndex, JSON.stringify(bukuBaru));
        })
    })
}

for (let i = 0; i < tombolSelesai.length; i++) {
    tombolSelesai[i].addEventListener('click', () => {
        const bukuYangTerkenaAksi = document.getElementById(tombolSelesai[i].getAttribute("value"));

        const paramIndex = bukuYangTerkenaAksi.getAttribute("id")

        let ambil_data = JSON.parse(localStorage.getItem(paramIndex));

        console.log(ambil_data)

        if (ambil_data.selesai == false) {
            ambil_data.selesai = true;
        } else {
            ambil_data.selesai = false;
        }
        ambil_data = JSON.stringify(ambil_data);
        localStorage.setItem(paramIndex, ambil_data)
        console.log(ambil_data)

        window.location.reload()
    })
}

for (let i = 0; i < tombolHapusBuku.length; i++) {
    tombolHapusBuku[i].addEventListener('click', () => {

        const bukuYangTerkenaAksi = document.getElementById(tombolHapusBuku[i].getAttribute("value"));

        const cekIndex = bukuYangTerkenaAksi.getAttribute("id")

        localStorage.removeItem(cekIndex)

        window.location.reload()
    })
}

submit.addEventListener('click', (e) => {
    simpanBuku();
    tampilkanBukuTerbaru()
    e.preventDefault();
})