import React, {useEffect, useState} from "react";

import style from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-food-app-76807-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
            const responseData = await response.json();

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            const loadedMeals = [];

            for(const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if(isLoading) {
        return (
            <section className={style.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if(httpError) {
        return (
            <section className={style.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map(meal => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={style.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;