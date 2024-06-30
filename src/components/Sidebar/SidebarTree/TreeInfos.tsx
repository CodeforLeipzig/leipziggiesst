import React, { FC, useState } from 'react';
import styled from 'styled-components';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import copy from "copy-to-clipboard";

import { getWaterNeedByAge } from '../../../utils/getWaterNeedByAge';

import ExpandablePanel from '../../ExpandablePanel';
import WaterNeedsInfo from '../../WaterNeedsInfo';
import UsersWateringsList from '../../UsersWateringsList';
import ButtonWater from '../../ButtonWater';
import WaterDrops from '../../WaterDrops';
import Login from '../../Login';

import content from '../../../assets/content';
import { SelectedTreeType } from '../../../common/interfaces';
import Icon from '../../Icons';
import StackedBarChart from '../../StackedBarChart';
import { useUserData } from '../../../utils/hooks/useUserData';
import { ParticipateButton } from '../../ParticipateButton';
import Paragraph from '../../Paragraph';
import { NonVerfiedMailMessage } from '../../NonVerfiedMailMessage';
import ButtonRound from '../../ButtonRound';
import SmallParagraph from '../../SmallParagraph';
import { useAdoptingActions } from '../../../utils/hooks/useAdoptingActions';

const logoWikipedia = '/images/Wikipedia-W-bold-in-square-Clean_(alt_crop).svg';
const logoWikicommons = '/images/Green_circle_with_camera_and_white_border.svg';
const logoWikidata = '/images/Wikidata-HS-icon.svg';
const logoInfo = '/images/Information_icon_1(png).png'

const steckbriefe = {
  "Tilia": "https://www.bund-leipzig.de/fileadmin/leipzig/PDF/Steckbrief/Baumsteckbriefe.pdf",
  "Betula": "https://www.bund-leipzig.de/fileadmin/leipzig/PDF/Steckbrief/Baumsteckbriefe.pdf#page=7",
  "Salix": "https://www.bund-leipzig.de/fileadmin/leipzig/PDF/Steckbrief/Baumsteckbriefe.pdf#page=8",
  "Castanea": "https://www.bund-leipzig.de/fileadmin/leipzig/PDF/Steckbrief/Baumsteckbriefe.pdf#page=6",
  "Quercus": "https://www.bund-leipzig.de/fileadmin/leipzig/PDF/Steckbrief/Baumsteckbriefe.pdf#page=5",
  "Platanus": "https://www.bund-leipzig.de/fileadmin/leipzig/PDF/Steckbrief/Baumsteckbriefe.pdf#page=4",
  "Acer": "https://www.bund-leipzig.de/fileadmin/leipzig/PDF/Steckbrief/Baumsteckbriefe.pdf#page=2",
  "Fraxinus": "https://www.bund-leipzig.de/fileadmin/leipzig/PDF/Steckbrief/Baumsteckbriefe.pdf#page=3"
}

const WikipediaLogo = styled.img`
  padding-bottom: 6px;
  height: 15px;
`;

const WikicommonsLogo = styled.img`
  padding-bottom: 2px;
  height: 25px;
`;

const WikidataLogo = styled.img`
  height: 30px;
`;

const InfoLogo = styled.img`
  padding-bottom: 4px;
  height: 20px;
`;

const { treetypes } = content.sidebar;

const Wrapper = styled.div`
  z-index: 3;
  margin: 0 0 20px;
`;

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CaretakerDiv = styled.div`
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  line-height: ${p =>
    parseFloat(p.theme.fontSizeM.replace('rem', '')) * 1.2}rem;
`;

const CaretakerSublineSpan = styled.span`
  font-size: ${p => p.theme.fontSizeM};
  margin-top: -${p => parseFloat(p.theme.fontSizeM.replace('rem', '')) / 2 + 0.1}rem;
  margin-left: -${p => p.theme.fontSizeM};
`;

const TreeTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0px;
  line-height: 125%;
  margin-bottom: 5px;
  button {
    padding-bottom: 15px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding: 12px 0;
  font-weight: bold;
`;

const InfoValue = styled.span`
  font-weight: normal;
`;

const AdoptedIndication = styled.span`
  display: inline-block;
  margin-left: 8px;
  border-radius: 2px;
  font-size: ${p => p.theme.fontSizeM};
  line-height: ${p => p.theme.fontSizeM};
  color: ${p => p.theme.colorPrimary};
  border: 1px solid;
  padding: 4px 5px;
  font-weight: normal;
  transform: translateY(-4px);
`;

const TreeInfos: FC<{
  selectedTreeData: SelectedTreeType;
}> = ({ selectedTreeData }) => {
  const {
    id: treeId,
    pflanzjahr,
    standortnr,
    artbot,
    artdtsch,
    gattung,
    gattungdeutsch,
    baumhoehe,
    kronedurch,
    stammumfg,
    gattungwikipedia,
    gattungwikidata,
    gattungwikicommons,
    artwikipedia,
    artwikidata,
    artwikicommons,
    caretaker,
    waterings,
    notes,
  } = selectedTreeData;

  const steckbrief = gattung && steckbriefe[gattung];

  const [open, setOpen] = useState(false);

  const { userData } = useUserData();
  const {
    unadoptTree,
    adoptTree,
    isBeingAdopted,
    isBeingUnadopted,
  } = useAdoptingActions(treeId);

  const treeType = treetypes.find(treetype => treetype.id === gattungdeutsch);

  const treeIsAdopted =
    userData && userData.adoptedTrees.find(({ id }) => id === treeId);

  const treeAge =
    pflanzjahr && pflanzjahr !== 'undefined' && pflanzjahr !== 'NaN'
      ? new Date().getFullYear() - parseInt(pflanzjahr, 10)
      : undefined;


  const getTreeLink = () => window.location.href;

  const handleLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Baum-Link',
        text: 'Teile den Link zum Baum',
        url: getTreeLink()
      })
      .catch(console.error);
    } else {
      setOpen(true)
    }
  };

  const formatNumber = (str: string) => {
    try {
      return parseFloat(str).toLocaleString("de");
    } catch(e) {
      return str;
    }
  };

  return (
    <Wrapper>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="share-tree-dialog-title" open={open}>
        <DialogTitle id="share-tree-dialog-title">Baum-Link</DialogTitle>
        <DialogContent>
          <DialogContentText>Teile den Link zum Baum:</DialogContentText>
          <DialogContentText>
            <a href={`${getTreeLink()}`}>{getTreeLink()}</a>
            <IconButton onClick={() => copy(getTreeLink())}>
              <FileCopyIcon />
            </IconButton>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      <FlexColumnDiv>
        {(artdtsch || gattungdeutsch || treeType?.title) && (
          <TreeTitle>
            {artdtsch || gattungdeutsch || treeType?.title}
            {treeIsAdopted && (
              <AdoptedIndication>Adoptiert ✔</AdoptedIndication>
            )}
            <IconButton onClick={handleLink}><ShareIcon /></IconButton>
          </TreeTitle>
        )}
        {(artwikipedia || artwikicommons || artwikidata) && (
          <InfoContainer>
            <span style={{ paddingTop: "8px" }}>Baumart-Infos</span>
            <InfoValue>
            <div style={{ height: "40px" }}>
                {artwikipedia && (
                  <a
                    href={artwikipedia}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <WikipediaLogo src={logoWikipedia} alt='Link zu Wikipedia-Eintrag' />
                  </a>
                )}
                {artwikicommons && (
                  <a
                    href={artwikicommons}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <WikicommonsLogo src={logoWikicommons} alt='Link zu Wikicommons-Eintrag' />
                  </a>
                )}
                {artwikidata && (
                  <a
                    href={artwikidata}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <WikidataLogo src={logoWikidata} alt='Link zu Wikidata-Eintrag' />
                  </a>
                )}
              </div>
            </InfoValue>
          </InfoContainer>
        )}
        {caretaker && caretaker.length > 0 && (
          <CaretakerDiv>
            <Icon iconType='water' height={32}></Icon>
            <CaretakerSublineSpan>{`Dieser Baum wird regelmäßig vom ${caretaker} gewässert.`}</CaretakerSublineSpan>
          </CaretakerDiv>
        )}
        {treeType && treeType.title && (
          <ExpandablePanel title={treeType.title}>
            {treeType.description}
          </ExpandablePanel>
        )}
        {artbot && (
          <InfoContainer>
            <span>Name (wiss.)</span>
            <InfoValue>{artbot}</InfoValue>
          </InfoContainer>
        )}
        {gattungdeutsch && (
          <InfoContainer>
            <span>Gattung</span>
            <InfoValue>
              {gattungdeutsch}
            </InfoValue>
          </InfoContainer>
        )}
        {(gattungwikipedia || gattungwikicommons || gattungwikidata) && (
          <InfoContainer>
            <span style={{ paddingTop: "8px" }}>Gattung-Infos</span>
            <InfoValue>
              <div style={{ height: "40px" }}>
                {steckbrief && (
                  <a
                    href={steckbrief}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <InfoLogo src={logoInfo} alt='Link zu Baumsteckbrief' />
                  </a>
                )}
                {gattungwikipedia && (
                  <a
                    href={gattungwikipedia}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <WikipediaLogo src={logoWikipedia} alt='Link zu Wikipedia-Eintrag' />
                  </a>
                )}
                {gattungwikicommons && (
                  <a
                    href={gattungwikicommons}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <WikicommonsLogo src={logoWikicommons} alt='Link zu Wikicommons-Eintrag' />
                  </a>
                )}
                {gattungwikidata && (
                  <a
                    href={gattungwikidata}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <WikidataLogo src={logoWikidata} alt='Link zu Wikidata-Eintrag' />
                  </a>
                )}
              </div>
            </InfoValue>
          </InfoContainer>
        )}
        {gattung && (
          <InfoContainer>
            <span>Gattung (wiss.)</span>
            <InfoValue>{gattung}</InfoValue>
          </InfoContainer>
        )}
        {standortnr && (
          <InfoContainer>
            <span>Standortnummer</span>
            <InfoValue>{standortnr}</InfoValue>
          </InfoContainer>
        )}
        {treeAge === undefined && (
          <>
            <InfoContainer>
              <span>Standalter</span>
              <InfoValue>unbekannt</InfoValue>
            </InfoContainer>
          </>
        )}
        {typeof treeAge === 'number' && (
          <InfoContainer>
            <span>Standalter</span>
            <InfoValue>{treeAge == 0 ? "jünger als " : ""} {treeAge == 0 ? 1 : treeAge} Jahr{treeAge > 1 ? "e" : ""}</InfoValue>
          </InfoContainer>
        )}
        {typeof treeAge === 'number' && (
          <ExpandablePanel
            title={
              <>
                <span style={{ marginRight: 8 }}>Wasserbedarf:</span>
                <WaterDrops dropsAmount={getWaterNeedByAge(treeAge)} />
              </>
            }
          >
            <WaterNeedsInfo />
          </ExpandablePanel>
        )}
        {baumhoehe && (
          <InfoContainer>
            <span>Höhe</span>
            <InfoValue>{formatNumber(baumhoehe)} m</InfoValue>
          </InfoContainer>
        )}
        {stammumfg && (
          <InfoContainer>
            <span>Stammumfang</span>
            <InfoValue>{formatNumber(stammumfg)} cm</InfoValue>
          </InfoContainer>
        )}
        {kronedurch && (
          <InfoContainer>
            <span>Kronendurchmesser</span>
            <InfoValue>{formatNumber(kronedurch)} m</InfoValue>
          </InfoContainer>
        )}
        { notes && (
          <ExpandablePanel
            title={
              <>
                <span style={{ marginRight: 8 }}>Hintergrund-Infos</span>
              </>
            }
          >
            <span dangerouslySetInnerHTML={{ __html: `${notes}` }}></span>
          </ExpandablePanel>
        )}
        <ExpandablePanel
          title={
            <>
              <div>Wassermenge</div>
              <SmallParagraph>der letzten 30 Tage</SmallParagraph>
            </>
          }
          isExpanded
        >
          <StackedBarChart selectedTreeData={selectedTreeData} />
        </ExpandablePanel>
        {Array.isArray(waterings) && waterings.length > 0 && (
          <ExpandablePanel
            isExpanded={true}
            title={
              <>
                Letzte Bewässerungen
                <SmallParagraph>Neueste zuerst</SmallParagraph>
              </>
            }
          >
            <UsersWateringsList
              waterings={waterings}
              showTreeName={false}
            />
          </ExpandablePanel>
        )}

        <br />
        {!userData && (
          <div>
            <Login />
            <ParticipateButton />
          </div>
        )}

        {userData && !userData.isVerified && (
          <>
            <Paragraph>
              Bäume wässern und für sie die Gießpatenschaft übernehmen ist nur mit verifiziertem
              Account möglich.
            </Paragraph>
            <NonVerfiedMailMessage />
          </>
        )}

        {userData && userData.isVerified && (
          <>
            <ButtonRound
              margin='15px'
              onClick={() => (treeIsAdopted ? unadoptTree() : adoptTree())}
              type='secondary'
            >
              {treeIsAdopted && !isBeingUnadopted && 'Gießpatenschaft auflösen'}
              {treeIsAdopted && isBeingUnadopted && 'Gießpatenschaft wird aufgelöst'}
              {!treeIsAdopted && !isBeingAdopted && 'Gießpatenschaft übernehmen'}
              {!treeIsAdopted && isBeingAdopted && 'Gießpatenschaft wird übernommen'}
            </ButtonRound>
            <ButtonWater />
          </>
        )}
      </FlexColumnDiv>
    </Wrapper>
  );
};

export default TreeInfos;
