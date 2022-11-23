import { useState } from "react";
import "./App.css";

function App() {
  const [fileData, setFileData] = useState();
  const [submitText, setSubmitText] = useState();
  const [image, setImage] = useState();
  const [dogImage, setDogImage] = useState();
  const [dogUrl, setDogUrl] = useState();

  const fileChangeHandler = (e) => {
    if (e.target.files.length > 1) {
      setFileData(e.target.files);
      setImage(e.target.files[0]);
    } else {
      setFileData(e.target.files[0]);
      setImage(e.target.files[0]);
    };
  }


  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = new FormData();
    if (fileData.length > 1) {
      let len =fileData.length
      for (let i=0; i < len; i++ ){
        data.append("images", fileData.item(i))
      }

      fetch("http://localhost:8000/multiple", {
        method: "POST",
        body: data, 
        mode: 'no-cors',
      })
        .then((result) => {
          console.log("File Sent");
          setSubmitText("File Sent");
        })
        .catch((err) => {
          console.log(err.message);
          setSubmitText(err.message);
        });

    } else {
      data.append("image", fileData);
      fetch("http://localhost:8000/single", {
        method: "POST",
        body: data,
        mode: 'no-cors',
      })
        .then((result) => {
          console.log(result)
          console.log("File Sent");
          setSubmitText("File Sent");
        })
        .catch((err) => {
          console.log(err.message);
          setSubmitText(err.message);
        });
    }
  };

  const getRandomImage = (e) => {
    // Fetch request to express api to get image
    fetch("/single")
      .then((result) => {
        // Error handling
        if (result.status !== 200) {
          setSubmitText("Could not get random image");
          return Promise.reject("Exit promise");
        }
        return result.blob();
      })
      .then((image) => {
        console.log(image);
        setSubmitText("Random file received");
        setImage(image);
      })
      .catch((err) => {
        console.log(err.message);
        setSubmitText("Could not get random image");
      });
  };

  const getDogUrl = () =>{
    const API = "https://dog.ceo/api/breeds/image/random";
    fetch(API)
      .then(response => response.json())
      .then(dogUrl => {
        setDogUrl(dogUrl.message)
      })
  }

  const changeRandomImage = () => {
    getDogUrl()
    getDogUrl()
    fetch(dogUrl)
      .then(response => response.blob())
      .then(dogBlob => {
        setDogImage(dogBlob)
        setFileData(dogBlob)
      })

  }


  const sendRandomImage = (e) => {
    // Fetch request to express api to get image
    e.preventDefault();
    const random = new FormData();
    random.append("dogImage", fileData, 'dog.jpg');
    fetch("http://localhost:8000/dog", {
      method: "POST",
      body: random,
    })
      .then((dogImage) => {
        console.log(dogImage);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
          <input type="file" onChange={fileChangeHandler} multiple />
          <br />
          <button type="button" onClick={getRandomImage}>
            Get random image from backend
          </button>
          <br />
          <br />
          <button type="submit">Submit file to Backend</button>
          <br />
          <br />
          <p>{submitText}</p>
          {image != null && (
            <img
              alt=""
              src={URL.createObjectURL(image)}
              width="1000"
              height="auto"
            />
          )}
        </form>
        <form onSubmit={sendRandomImage}>
          <br />
          <button type="button" onClick={changeRandomImage}>Get random dog image</button>
          <br />
          <button type="submit">Send dog image to backend</button>
          <br />

          {dogImage != null && (
            <img
              alt=""
              src={URL.createObjectURL(dogImage)}
              width="1000"
              height="auto"
            />
          )}
        </form>
      </header>
    </div>
  );
}

export default App;
