import Category from "../models/Category"

export async function getCategories(): Promise<Category[]> {
    const response = await fetch('http://localhost:4000/api/categories')
    const json = await response.json()
    const categories: Category[] = json.categories

    return categories
}

export async function addCategory(category: Category): Promise<void> {
        const response = await fetch('http://localhost:4000/api/categories', {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response)
}
