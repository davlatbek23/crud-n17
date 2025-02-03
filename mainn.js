const apiUrl = "https://679a1359747b09cdcccd92fa.mockapi.io/tavarlar";
const r = document.querySelector("#root");

const iname = document.querySelector("#name");
const iprice = document.querySelector("#price");
const icolor = document.querySelector("#color");
const iimage = document.querySelector("#image");
const btn = document.querySelector("#send");

async function createProduct() {
    let newProduct = {
        name: iname.value,
        price: iprice.value,
        color: icolor.value,
        image: iimage.value
    };

    try {
        await axios.post(apiUrl, newProduct);
        location.reload();
    } catch (error) {
        console.error("Yangi mahsulot qo‘shishda xatolik:", error);
    }
}

btn.addEventListener("click", createProduct);

async function delprod(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        location.reload();
    } catch (error) {
        console.error("O‘chirishda xatolik:", error);
    }
}

async function showFront() {
    try {
        const response = await axios.get(apiUrl);
        const products = response.data;

        r.innerHTML = ""; 

        products.forEach((e) => {
            r.insertAdjacentHTML(
                "beforeend",
                `<div class="card">
                    <img src="${e.image}" alt=""/>
                    <h1>${e.name}</h1>
                    <p>${e.price}</p>
                    <p>${e.color}</p>
                    <button class="delete" onClick="delprod(${e.id})">delete</button>
                    <button class="edit" onClick="updateProd(${e.id}, '${e.name}', '${e.price}', '${e.color}', '${e.image}')">edit</button>
                </div>`
            );
        });
    } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
    }
}

async function updateProd(id, name, price, color, image) {
    iname.value = name;
    iprice.value = price;
    icolor.value = color;
    iimage.value = image;

    btn.onclick = async function () {
        let updatedProduct = {
            name: iname.value,
            price: iprice.value,
            color: icolor.value,
            image: iimage.value
        };

        try {
            await axios.put(`${apiUrl}/${id}`, updatedProduct);
            location.reload();
        } catch (error) {
            console.error("Yangilashda xatolik:", error);
        }
    };
}

showFront();
