import React, { FC } from 'react';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { isMobile } from 'react-device-detect';

const logoCitylab = '/images/citylab-logo.svg';
const logoCodeForLeipzig = '/images/cfg-leipzig-logo.svg';
const logoWirImQuartier = '/images/wiq-logo.png';
const logoStiftungEckenWecken = '/images/sew-logo.png';
const logoBUNDLeipzig = '/images/bund-leipzig.png';
const logoLeipzigASG = '/images/leipzig-asg.png';
const logoDigiPreis = '/images/digitalpreis.jpg';
const logoDsee = '/images/dsee.svg';
const logoTransformD = '/images/transformd.png';


const CreditsContainer = styled.div`
  width: 300px;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: end;
  position: absolute;
  top: 12px;
  right: 12px;

  @media only screen and (max-width: ${p => p.theme.screens.tablet}) {
    .carousel-wrapper{
      max-width: 100%;
    }
  }

  span {
    margin-top: 5px;
    margin-bottom: 15px;
    width: fit-content;
    font-size: ${p => p.theme.fontSizeL};
  }

  span.project {
    padding-left: 35px;
  }
  div.clickable {
    cursor: pointer;
  }
`;

const CityLABLogo = styled.img`
  width: 220px;
  margin: 10px 0 5px 0;
  padding-left: 35px;
`;

const ASGLogo = styled.img`
  height: 60px;
  margin: 10px 0 5px 0;
  padding-left: 35px;
`;

const BUNDLogo = styled.img`
  height: 80px;
  margin: 10px 0 5px 0;
  padding-right: 30px;
  padding-left: 70px;
`;

const WIQLogo = styled.img`
  height: 60px;
  margin: 10px 0 5px 0;
  padding-right: 70px;
  padding-left: 110px;
`;

const SEWLogo = styled.img`
  height: 80px;
  margin: 10px 0 5px 0;
  padding-right: 80px;
  padding-left: 100px;
`;

const CFGLogo = styled.img`
  height: 80px;
  margin: 0px 0 5px 0;
`;

const DigiPreisLogo = styled.img`
  width: 220px;
  margin: 10px 0 5px 0;
  padding-left: 35px;
`;

const DseeLogo = styled.img`
  width: 220px;
  margin: 10px 0 5px 0;
  padding-left: 35px;
`;

const TransformDLogo = styled.img`
  height: 80px;
  margin: 10px 0 5px 0;
  padding-right: 80px;
  padding-left: 100px;
`;

const Credits: FC = () => {
  if (isMobile) {
    return <div />
  }
  return (
    <CreditsContainer>
      <Carousel showThumbs={false} autoPlay={true} interval={6000}
          dynamicHeight={false} centerMode={false} showStatus={false}
          showArrows={false} showIndicators={false} infiniteLoop={true}
          width={'100%'} transitionTime={1000}>
        <div className={'clickable'} onClick={() => window.open("https://codefor.de/leipzig")}>
          <span className="project">Ein Projekt von:</span>
          <CFGLogo src={logoCodeForLeipzig} alt='Logo Code for Leipzig' />
        </div>
        <div className={'clickable'} onClick={() => window.open("https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/behoerden-und-dienstleistungen/dienststelle/amt-fuer-stadtgruen-und-gewaesser-67/")}>
          <span className="project">Ein Projekt von:</span>
          <ASGLogo src={logoLeipzigASG} alt='Logo Leipzig Amt für Stadtgrün und Gewässer' />
        </div>
        <div className={'clickable'} onClick={() => window.open("https://stiftung-ecken-wecken.de")}>
          <span className="project">Ein Projekt von:</span>
          <SEWLogo src={logoStiftungEckenWecken} alt='Logo Stiftung Ecken Wecken' />
        </div>
        <div className={'clickable'} onClick={() => window.open("https://stiftung-ecken-wecken.de/WIQ")}>
          <span className="project">Ein Projekt von:</span>
          <WIQLogo src={logoWirImQuartier} alt='Logo Wir im Quartier' />
        </div>
        <div className={'clickable'} onClick={() => window.open("https://www.bund-leipzig.de/")}>
          <span className="project">Ein Projekt von:</span>
          <BUNDLogo src={logoBUNDLeipzig} alt='Logo BUND Leipzig' />
        </div>
        <div className={'clickable'} onClick={() => window.open("https://www.citylab-berlin.org")}>
          <span className="project">Unterstützt durch:</span>
          <CityLABLogo src={logoCitylab} alt='Logo CityLab Berlin' />
        </div>
        <div className={'clickable'} onClick={() => window.open("https://www.digitales.sachsen.de/DigiPreis22.html")}>
          <span className="project">Gewinner von:</span>
          <DigiPreisLogo src={logoDigiPreis} alt='Logo Digitalpreis' />
        </div>
        <div className={'clickable'} onClick={() => window.open("https://www.deutsche-stiftung-engagement-und-ehrenamt.de")}>
          <span className="project">Gefördert von:</span>
          <DseeLogo src={logoDsee} alt='Logo Deutsche Stiftung Engagement und Ehrenamt' />
        </div>
        <div className={'clickable'} onClick={() => window.open("https://www.deutsche-stiftung-engagement-und-ehrenamt.de/foerderung/transformd/")}>
          <span className="project">Gefördert im Rahmen von:</span>
          <TransformDLogo src={logoTransformD} alt='Logo transform_D' />
        </div>
      </Carousel>
    </CreditsContainer>
  );
};

export default Credits;
