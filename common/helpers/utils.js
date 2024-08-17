export const getPaginatedProducts = (products) => {
    if (products.length > 0) {
        const numberPerPage = 6;
        const pages = Math.ceil(products.length / numberPerPage);
        const paginatedProducts = Array.from({ length: pages }, (_, index) => {
            const start = index * numberPerPage;
            const end = start + numberPerPage;
            return products.slice(start, end);
        });

        return paginatedProducts;
    }

    return [[]];
};

export const getUniqueValues = (arr, type) => {
    if (arr) {
        let unique = [];
        arr.forEach((item) => {
            let { variations } = item;
            unique.push(...new Set(variations[type])); // this will get the colors instead of color arrays
        });
        return ["all", ...new Set(unique)];
    }
};

export const getUniqueCategory = (products) => {
    if (products) {
        const categories = products.map((product) => product["category"]);
        return ["all", ...new Set(categories)];
    }
};

export const getMaxPrice = (products) => {
    if (products) {
        const price = [];
        products.forEach((product) => {
            price.push(parseFloat(product.price));
        });

        return Math.max(...price) + 100;
    }
};
