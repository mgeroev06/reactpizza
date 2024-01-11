import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type PizzaType = {
    imageUrl: string
    title: string
    price: number
}

const FullPizza: FC = () => {
    const {id} = useParams();
    const [pizza, setPizza] = useState<PizzaType>();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://658a6740ba789a962237039d.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>"Загрузка..."</>;
    }

    return (
      <div className="container">
          <img src={pizza.imageUrl}/>
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} Р</h4>
      </div>
    );
};

export default FullPizza;