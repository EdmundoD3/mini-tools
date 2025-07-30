import './App.css'
import { Router, Route } from 'preact-router';
import { QRCodeGenerator } from './components/QRCodeGenerator'
import { VideoToImg } from './components/VideoToImage'
import { NotFound } from './components/NotFound';
import { Redirect } from './components/Redirect';
import MainDiv from './ui/mainDiv';

export function App() {


  return (
    <MainDiv>
      <Router>
        <Redirect path="/index.html" to="/" />
        <Route path="/" component={QRCodeGenerator} />
        <Route path="/video-to-image" component={VideoToImg} />
        <Route default component={NotFound} />
      </Router>
    </MainDiv>
  )
}
