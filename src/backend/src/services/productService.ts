import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Pro 16 Plus",
        image:
          "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-pro-plus/pb16250/media-gallery/notebook-pb16250-nt-c-gy-fpr-mipi-5mp-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3502&hei=2053&qlt=100,1&resMode=sharp2&size=3502,2053&chrss=full&imwidth=5000",
        price: 25000,
        stock: 98,
        Spec: {
          proccesor: "Up to Intel® Core™ Ultra 7 268V",
          os: "Windows 11 Pro",
          ram: "Up to 32 GB",
          storage: "Up to 1 TB",
          graphics: "Up to Intel® Arc™ Graphics",
        },
      },
      {
        title: "Dell Pro 14 Premium",
        image:
          "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-pro-premium/pa14250/media-gallery/notebook-14-pa14250-nt-gy-entry-panel-plastic-bezel-wlan-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3310&hei=1996&qlt=100,1&resMode=sharp2&size=3310,1996&chrss=full&imwidth=5000",
        price: 35000,
        stock: 98,
        Spec: {
          proccesor: "Up to Intel® Core™ Ultra 7 268V",
          os: "Windows 11 Pro",
          ram: "Up to 32 GB",
          storage: "Up to 1 TB",
          graphics: "Up to Intel® Arc™ Graphics",
        },
      },
      {
        title: "Dell Pro 14 Plus",
        image:
          "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-pro-plus/pb14250/media-gallery/2-in-1/wlan/2in1-dellpro-pb14250t-gy-mipi-5mp-ir-wlan-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3388&hei=3061&qlt=100,1&resMode=sharp2&size=3388,3061&chrss=full&imwidth=5000",
        price: 30000,
        stock: 98,
        Spec: {
          proccesor: "Up to Intel® Core™ Ultra 7 268V",
          os: "Windows 11 Pro",
          ram: "Up to 32 GB",
          storage: "Up to 1 TB",
          graphics: "Up to Intel® Arc™ Graphics",
        },
      },
      {
        title: "Dell Pro 13 Premium",
        image:
          "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-pro-premium/pa13250/media-gallery/entry-panel-pl-bezel-wlan/laptop-dell-pro-pa13250nt-gy-entry-panel-pl-bezel-wlan-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4000&hei=2392&qlt=100,1&resMode=sharp2&size=4000,2392&chrss=full&imwidth=5000",
        price: 35000,
        stock: 98,
        Spec: {
          proccesor: "Up to Intel® Core™ Ultra 7 268V",
          os: "Windows 11 Pro",
          ram: "Up to 32 GB",
          storage: "Up to 1 TB",
          graphics: "Up to Intel® Arc™ Graphics",
        },
      },
      {
        title: "Inspiron 15 Laptop",
        image:
          "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3520/media-gallery/in3520-xnb-01-bk.psd?fmt=png-alpha&pscan=auto&scl=1&wid=5000&hei=5000&qlt=100,1&resMode=sharp2&size=5000,5000&chrss=full&imwidth=5000",
        price: 25000,
        stock: 98,
        Spec: {
          proccesor: "Up to Intel® Core™ i7-1255U",
          os: "Windows 11 Home or Windows 11 Pro",
          ram: "Up to 16 GB",
          storage: "Up to 1 TB",
          graphics: "Up to Intel® UHD Graphics",
        },
      },
      {
        title: "XPS 15 Laptop",
        image:
          "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/touch-black/notebook-xps-15-9530-t-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3778&hei=2323&qlt=100,1&resMode=sharp2&size=3778,2323&chrss=full&imwidth=5000",
        price: 30000,
        stock: 98,
        Spec: {
          proccesor: "Up to Intel® Core™ i7-13620H",
          os: "Windows 11 Home or Windows 11 Pro",
          ram: "Up to 16 GB",
          storage: "Up to 1 TB",
          graphics: "Up to Intel® Arc™ Graphics A370M",
        },
      },
      {
        title: "​Lenovo ​ThinkPad E16 Gen 1 Business Laptop",
        image:
          "https://egyptlaptop.com/images/detailed/71/%E2%80%8BLenovo-%E2%80%8BThinkPad-E16-Gen-1.webp",
        price: 37777,
        stock: 98,
        Spec: {
          proccesor: "Processor: Intel Core I5-1335U",
          os: "Operating system: Dos",
          ram: "RAM: 8GB",
          storage: "Storage: 512GB SSD",
          graphics: "Graphics: NVIDIA GeForce MX550 2GB",
        },
      },
      // -------------------------------------------------------
      {
        title: "Lenovo LOQ 15ARP9 Gaming Laptop",
        image:
          "https://egyptlaptop.com/images/detailed/71/Lenovo_LOQ_15ARP9.webp",
        price: 61999,
        stock: 98,
        Spec: {
          proccesor: "Processor: AMD Ryzen 7 7435HS",
          os: "Operating system: Windows 11 Home",
          ram: "RAM: 16GB",
          storage: "Storage: 512GB SSD",
          graphics: "Graphics: Nvidia GeForce RTX 4070 8GB",
        },
      },
      {
        title: "Lenovo LOQ 15IRX9 Gaming Laptop",
        image:
          "https://egyptlaptop.com/images/detailed/71/Lenovo_LOQ_15IRX9.webp",
        price: 51999,
        stock: 98,
        Spec: {
          proccesor: "Processor: Intel Core i7-13650HX",
          os: "Operating system:  Windows 11 Home",
          ram: "RAM: 16GB",
          storage: "Storage: 512GB SSD",
          graphics: " Nvidia GeForce RTX 4060 8GB",
        },
      },
      {
        title: "Lenovo ThinkBook 15 G4 IAP Business laptop",
        image:
          "https://egyptlaptop.com/images/detailed/71/%E2%80%8BLenovo-%E2%80%8BThinkPad-E16-Gen-1.webp",
        price: 29999,
        stock: 98,
        Spec: {
          proccesor: "Processor: Intel Core I7-1255U",
          os: "Operating system: Dos",
          ram: "RAM: 8GB",
          storage: "Storage: 512GB SSD",
          graphics: "Graphics: Intel Iris Xe Graphics",
        },
      },
      {
        title: "Lenovo IdeaPad Slim 3 15IRH8",
        image:
          "https://egyptlaptop.com/images/detailed/68/Lenovo_IdeaPad_Slim_3_15IRH8_cg5o-r6.webp",
        price: 22500,
        stock: 98,
        Spec: {
          proccesor: "Processor: Intel Core I5-1335U",
          os: "Operating system: Dos",
          ram: "RAM: 8GB",
          storage: "Storage: 512GB SSD",
          graphics: "Graphics: NVIDIA GeForce MX550 2GB",
        },
      },
      {
        title: "Lenovo Legion Pro 5 16IRX8 Gaming laptop",
        image:
          "https://egyptlaptop.com/images/detailed/69/Lenovo_Legion_Pro_5_16IRX8_Gaming_laptop.webp",
        price: 92000,
        stock: 98,
        Spec: {
          proccesor: "Processor:Intel Core i7-13700HX",
          os: "Operating system: Win.11",
          ram: "RAM: 16GB",
          storage: "Storage: 1TB SSD",
          graphics: "Graphics:Nvidia GeForce RTX 4070",
        },
      },
    ];
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.log("Can Not Connect To Database", err);
  }
};
