import React from "react";
import * as ml5 from "ml5";

import ImageUpload from "./ImageUpload";
// import logo from './logo.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  classifyImg = () => {
    const { classifier } = this.state;
    const image = document.getElementById("image-to-predict");
    classifier.classify(image, 5, (err, results) => {
      console.log(results);
      this.setState({
        results
      });
    });
  };

  saveModel = classifier => {
    console.log("Model Loaded!");
    this.setState({
      classifier
    });
  };

  componentDidMount() {
    ml5.imageClassifier("MobileNet").then(this.saveModel);
  }

  onUpload = imageSrc => {
    this.setState(
      {
        imageSrc
      },
      this.classifyImg
    );
  };

  render() {
    const { imageSrc, results } = this.state;
    return (
      <>
        <ImageUpload onUpload={this.onUpload}></ImageUpload>
        {imageSrc ? (
          <img
            src={imageSrc}
            id="image-to-predict"
            alt="logo"
            width="100px"
            height="100px"
          />
        ) : null}
        {results.map(result => (
          <div key={result.label}>
            {result.label}: {(result.confidence * 100).toFixed(2)}%
          </div>
        ))}
      </>
    );
  }
}

export default App;
