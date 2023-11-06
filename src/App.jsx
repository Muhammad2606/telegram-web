import Card from "./companet/card/card";
import { getData } from "./constans/db"
import './app.css'
import Cart from "./companet/cart/cart";
import { useCallback, useEffect, useState } from "react";


const courses =  getData();
const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() =>{
    telegram.ready();
  })

  const onAddItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem) {
			const newData = cartItems.map(c =>
				c.id == item.id
					? { ...existItem, quantity: existItem.quantity + 1 }
					: c
			);
			setCartItems(newData);
		} else {
			const newData = [...cartItems, { ...item, quantity: 1 }];
			setCartItems(newData);
		}
	};
  const onDeleteItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

    if(existItem.quantity == 1){
      const newData = cartItems.filter( c => c.id !== existItem.id);
      setCartItems(newData)
    }
    else{
      const newData = cartItems.map(c => c.id == existItem.id
          ? {...existItem, quantity: existItem.quantity -1}
          : c
        );
        setCartItems(newData)

    }
  };


  const onCheckout = () =>{
    telegram.MainButton.text = 'sotib olish :)';
    telegram.MainButton.show();
  }

  const onSendData = useCallback(() =>{
    telegram.onSendData(JSON.stringify(cartItems));
  }, [cartItems]);


    useEffect(() =>{
      telegram.onEvent('mainButtonCliked', onSendData);

      return () => telegram.offEvent('mainButtonCliked', onSendData);
    }, [onSendData])


  return (
    <>
    <h1 className="curses__title">sammi kurslari</h1>
    <Cart cartItems={cartItems} onCheckout={onCheckout}/>
    <div className="cards__container">
    {courses.map(course =>(
   
       <Card key={course.id} 
       course={course}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem}
        />
 
    ))}
    </div>


    </>
  )
}

export default App