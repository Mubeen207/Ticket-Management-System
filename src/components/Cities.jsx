import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore/lite";
import { db } from "./FireBase";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [id, setID] = useState(0);

  const fetchCities = async () => {
    const snapshot = await getDocs(collection(db, "cities"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCities(list);
  };

  const addCity = async () => {
    if (isEdit) {
        await updateDoc(doc(db, "cities", id), {
        name: cityName,
        country: country,
      });
      fetchCities();
          setIsEdit(null);
    } else {
      await addDoc(collection(db, "cities"), {
        name: cityName,
        country: country,
      });
      fetchCities();
      setCityName("");
      setCountry("");
    }
  };

  const updateCity = async (city) => {
    setCityName(city.name);
    setCountry(city.country);
    setID(city.id);
    setIsEdit(true);
  };

  const deleteCity = async (id) => {
    await deleteDoc(doc(db, "cities", id));
    fetchCities();
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter City Name"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter Country Name"
      />
      <button onClick={addCity}>{isEdit ? "Update" : "Add"}</button>

      {cities.map((city) => (
        <div key={city.id}>
          <p>{city.name}</p>
          <button onClick={() => updateCity(city)}>Update</button>
          <button onClick={() => deleteCity(city.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Cities;
