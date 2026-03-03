// import React from 'react';

// const CasinoListItemWc = (props: any) => {
//   const { games, onPlay } = props;
  

//   return (
//     <>
//       {games?.map((Item: any, key: number) => {
//         const imageUrl = Item.game_icon_link
//           ? Item.game_icon_link
//           : `/assets/wsImages/${Item.gType}/${Item.game_id}.webp`;

//         return (
//           <div
//             className="casino-list-item"
//             onClick={(e) => {
//               e.preventDefault();
//               onPlay(Item);
//             }}
//             key={key}
//           >
//             <a href="#" className="">
//               <div
//                 className="casino-list-item-banner"
//                 style={{ backgroundImage: `url(${imageUrl})` }}
//               ></div>
//             </a>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default React.memo(CasinoListItemWc);


import React from "react";

interface GameItem {
  game_id: number | string;
  game_name?: string;
  game_icon_link?: string;
  gType?: string;
}

interface Props {
  games: GameItem[];
  onPlay: (item: GameItem) => void;
}

const FALLBACK_IMAGE = "/assets/wsImages/fallback.png";

const CasinoListItemWc: React.FC<Props> = ({ games, onPlay }) => {
  return (
    <>
      {games.map((item, key) => {
        const imageUrl =
          item.game_icon_link ||
          (item.gType && item.game_id
            ? `/assets/wsImages/${item.gType}/${item.game_id}.webp`
            : FALLBACK_IMAGE);

        return (
          <div
            className="casino-list-item"
            key={item.game_id ?? key}
            onClick={(e) => {
              e.preventDefault();
              onPlay(item);
            }}
          >
            <a href="#">
              <div
                className="casino-list-item-banner"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
              />
            </a>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(CasinoListItemWc);

