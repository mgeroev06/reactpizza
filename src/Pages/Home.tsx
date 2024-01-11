import React, {FC, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FilterSliceState, selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {Categories} from "../components/categories/Categories";
import {list, Sort} from "../components/sort/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import Pagination from "../components/Pagination";
import qs from "qs"
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";
import {AppDispatch, useAppDispatch} from "../redux/store";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const {items, status} = useSelector(selectPizzaData);
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);


  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  }


  const getPizzas = async () => {

    const sortBy = sort.sortProperty.replace("-", "") as string;
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage)
      }))

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort
        })
      );
    }
  }, [])

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  useEffect(() => {
    if (isMounted.current) {
      const params: FilterSliceState = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      };

      const queryString = qs.stringify(params, {skipNulls: true});

      navigate(`/?${queryString}`);
    }

    if (window.location.search) {
      dispatch(fetchPizzas(params));
    }


    isMounted.current = true;

  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  const pizzas = items.map((obj: any) => (
    <Link to={`pizza/${obj.id}`} key={obj.id}>
      <PizzaBlock {...obj} />
    </Link>
  ))
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);


  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => onChangeCategory(i)}
          getCategories={() => {
          }}
        />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>Попробуйте повторить позже</p>
          </div>) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )
      }
      <Pagination onChangePage={onChangePage} currentPage={currentPage}/>
    </div>
  )
};

export default Home;