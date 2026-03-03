import { AxiosResponse } from 'axios'
import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import casinoService from '../../services/casino.service'
import {
  selectCasinoMatchList,
} from '../../redux/actions/casino/casinoSlice'

import { useParams, useSearchParams } from 'react-router-dom'
import { CustomLink } from '../_layout/elements/custom-link'
import CasinoListItemInt from '../CasinoList/CasinoListItemInt'
import authService from '../../services/auth.service'
import { isMobile } from 'react-device-detect'

import dataJson from './wc_inout_response.json';

import CasinoListItemWcInout from '../CasinoList/CasinoListItemWcInout'
import { WcInoutResponse } from './wcInoutTypes'
import LoaderIcon from './loaderIcon'

const wc_inout_response = dataJson as WcInoutResponse;

const InoutWc = () => {
  const queryp = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [providers, setProviders] = React.useState<any>([]);
  const [games, setGames] = React.useState<any>([]);
  const [activeProvider, setActiveProvider] = React.useState<string>("");
  const [gamePlay, setGamePlay] = React.useState<any>(null);
  const [gameUrl, setGameUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const getTitleWB = (gType: number) => {
    switch (gType) {
      case 400:
        return { first: "Inout", second: "All", third: "Games" };
      case 500:
        return { first: "Lucky Sport", second: "All", third: "Games" };
      default:
        return { first: "WB", second: "Other", third: "Games" };
    }
  };

  React.useEffect(() => {
    const gameList = wc_inout_response.game_list;

     const ALLOWED_PROVIDERS = [500];

    const provArr = Object.keys(gameList)
      .map(Number)
      .filter((provId) => ALLOWED_PROVIDERS.includes(provId))
      .map((provId) => {
        const title = getTitleWB(provId);
        return {
          _id: String(provId),
          title_first: title.first,
          title_second: title.second,
          title_third: title.third,
        };
      });

    setProviders(provArr);

    const defaultProv = category || provArr[0]?._id || "1";
    setActiveProvider(defaultProv);

    const providerGames = (gameList[defaultProv] || []).map(g => ({
      ...g,
      gType: defaultProv
    }));

    setGames(providerGames);
  }, [category]);

  // When clicking provider from <CustomLink>
  React.useEffect(() => {
    const gameList = wc_inout_response.game_list;

    if (activeProvider) {
      const providerGames = (gameList[activeProvider] || []).map(g => ({
        ...g,
        gType: activeProvider
      }));

      setGames(providerGames);
    }
  }, [activeProvider]);

  React.useEffect(() => {
    const launchGame = async () => {
      if (!gamePlay) {
        setGameUrl('');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setGameUrl(''); // Clear old URL immediately

      console.log("Launching game:", gamePlay);

      const userInfo = await authService.getUser?.() || null;
      const uid = userInfo?.data?.data?.user?._id || '123456789';


      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASEURL_V1}launchZapcoreGame`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${authService.getToken()}`
          },
          body: JSON.stringify({ uid: String(uid), game_uid: gamePlay.game_uid,  gameId: gamePlay.id}),
          
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result?.launchUrl) {
          setGameUrl(result?.launchUrl);
        } else {
          throw new Error("Invalid WB response");
        }

      } catch (err: any) {
        console.error("WB Game Launch Error:", err);
        alert(err.message || "Game launch failed");
        setGamePlay(null);
        setIsLoading(false);
      }
    };

    launchGame();
  }, [gamePlay]);

  // Function to close game - clears all states
  const closeGame = () => {
    setGameUrl('');
    setGamePlay(null);
    setIsLoading(false);
  };

  React.useEffect(() => {
  if (games.length > 0 && !gamePlay) {
    setGamePlay(games[0]); // 🚀 auto load game here
  }
}, [games]);


  return (
    <>
      <div className='container-fluid container-fluid-5 cas-in-list'>
        <div className='row row5'>
          
          {/* Provider Sidebar */}
          <div className='col-xl-2 d-none d-xl-flex' style={{ marginTop: "5px" }}>
            <ul className="nav nav-pills casino-sub-tab">
              {providers.map((prov: any, key: number) => (
                <li className="nav-item" key={key}>
                  <CustomLink
                    className={`nav-link ${prov._id == activeProvider ? "active" : ""}`}
                    to={`/inout-wc/${queryp.type}?category=${prov._id}`}
                  >
                    <span>{prov.title_first} {prov.title_second}</span>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-xl-10 col-12 d-xl-none'>
                      <div className="casino-sub-tab-list" style={{marginTop:"5px"}}>
                        <ul className="nav nav-pills casino-sub-tab" id="casino-sub-tab">
                          {providers.map((prov: any, key: number) => (
                          <li className="nav-item" key={key}>
                            <CustomLink
                              className={`nav-link ${prov._id == activeProvider ? "active" : ""}`}
                              to={`/inout-wc/${queryp.type}?category=${prov._id}`}
                            >
                              <span>{prov.title_first} {prov.title_second}</span>
                            </CustomLink>
                          </li>
                        ))}
                         
                        </ul>
                      </div>
                    </div>

          {/* Game list */}
          <div className='col-xl-10 col-12'>
            <div className='casino-list mt-2' style={{ marginLeft: "-6px" }}>
              {games.length > 0 && (
                <CasinoListItemWcInout
                  games={games}
                  onPlay={(game: any) => {
                    // Close any existing game first
                    if (gamePlay) {
                      closeGame();
                      // Small delay to ensure cleanup
                      setTimeout(() => setGamePlay(game), 100);
                    } else {
                      setGamePlay(game);
                    }
                  }}
                />
              )}
            </div>
          </div>

        </div>
      </div>

    
      {gamePlay && (
        <div className="slot-iframe show">
          
          {/* HEADER (always visible) */}
          <div className="slot-header">
            <div className="title">
              <h4 className="mb-0 slot-title">{gamePlay.game_name}</h4>
            </div>

            <div className="close-slot-frame" onClick={closeGame}>
              EXIT
            </div>
          </div>

          {/* IFRAME WRAPPER */}
          <div
            className="iframe-wrapper"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* Loader (ONLY inside iframe area) */}
            {isLoading && (
              <LoaderIcon
                img="https://framerusercontent.com/images/FjkvJbpRB13LjSxgs08TUA0GMk.png?scale-down-to=512&width=4167&height=3741"
                title="Please wait..."
                style={{ width: "180px", marginBottom: "40px" }}
              />
              
            )}

            {/* IFRAME */}
            {gameUrl && (
              <iframe
                src={gameUrl}
                title="Game"
                style={{
                  width: "100%",
                  // height: "100%",
                  border: "none",
                }}
                onLoad={() => {
                  console.log("Game fully loaded");
                  setIsLoading(false);
                }}
              />
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default InoutWc