// import { Search } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import FileterPanel from '../../Components/Home/FilterPanel'
import List from '../../Components/Home/List'
import SearchBar from '../../Components/Home/SearchBar'
import { dataList } from '../../Contents'
import './styles.css';
import EmptyView from '../../Components/Common/EmptyView'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1, 1000]);
  const [list, setList] = useState(dataList);
  const [searchInput, setSearchInput] = useState('');
  const [resultsFound, setResultsFound] = useState('');


  const [cuisines, setCuisines] = useState([
    { id: 1, checked: false, label: 'breakfast' },
    { id: 2, checked: false, label: 'lunch' },
    { id: 3, checked: false, label: 'dinner' },
  ]);



  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value)

  const handleChangeChecked = id => {
    const cusinesStateList = cuisines;
    const changeCheckedCuisines = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckedCuisines);
  };

  const handleChangePrice = (event, value) => setSelectedPrice(value);

  const applyFilters = () => {
    let updatedList = dataList


    //Rating Filter

    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    // //category filter

    if (selectedCategory) {
      updatedList = updatedList.filter((item) => item.category === selectedCategory);
    }


    // // Cuisine Filter
    const cuisinesChecked = cuisines
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisinesChecked.includes(item.cuisine)
      );
    }


    // // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    //Price Filter

    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];


    updatedList = updatedList.filter(
      (item) => item.calories >= minPrice && item.calories <= maxPrice
    );







    setList(updatedList);
    // console.log(list)

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };






  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, cuisines, selectedPrice, searchInput]);


  return (
    <div className='home'>
      {/* search  Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className='home_panelList-wrap'>
        <div className='home_panel-wrap'>
          {/* side Panels */}
          <FileterPanel
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            cuisines={cuisines}
            changeChecked={handleChangeChecked}
            changePrice={handleChangePrice}

          />
        </div>
        <div className='home_list-wrap'>
          {/* list & Empty View  Bar */}
          {setResultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>


  );
};

export default Home