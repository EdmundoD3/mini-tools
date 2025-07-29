import './App.css'
import { Router, Route } from 'preact-router';
import { QRCodeGenerator } from './components/QRCodeGenerator'
import { VideoToImg } from './components/VideoToImage';
import MainDiv from './ui/mainDiv';

export function App() {


  return (<MainDiv>
    <Router>
      <Route path="/" component={QRCodeGenerator} />
      <Route path="/video-to-image" component={VideoToImg} />
    </Router>
  </MainDiv>
  )
}
