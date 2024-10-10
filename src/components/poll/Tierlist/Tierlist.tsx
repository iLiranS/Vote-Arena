// 'use client'
// import { optionPollForm } from '@/lib/models';
// import { Reorder } from 'framer-motion';
// import React, { useState } from 'react'

// const dummyOptions: optionPollForm[] = [
//     {
//         "title": "Battlefield 1",
//         "source": "video",
//         "src": "https://www.youtube.com/watch?v=P-UciWUiIXY&pp=ygULYmYxIHRyYWlsZXI%3D"
//     },
//     {
//         "title": "SINce memories",
//         "source": "video",
//         "src": "https://www.youtube.com/watch?v=Hxq_sdWoX_4"
//     },
//     {
//         "title": "Far cry 6",
//         "source": "video",
//         "src": "https://www.youtube.com/watch?v=-IJuKT1mHO8"
//     },
//     {
//         "title": "Gran turismo 7",
//         "source": "video",
//         "src": "https://www.youtube.com/watch?v=FlkNVeT_zxo"
//     },
//     {
//         "title": "Until dawn",
//         "source": "video",
//         "src": "https://www.youtube.com/watch?v=QzvpK2rwmOA"
//     },
//     {
//         "title": "Nubs",
//         "source": "video",
//         "src": "https://www.youtube.com/watch?v=QrPukGmW4vA"
//     },
//     {
//         "title": "League of legends",
//         "source": "video",
//         "src": "https://www.youtube.com/watch?v=cXZqfuJ9Zps"
//     },
//     {
//         "title": "Five Nights at Freddy's",
//         "source": "video",
//         "src": "https://www.youtube.com/watch?v=Ws-yd9YPfdE"
//     }
// ]

// // it's broken but here is the idea :
// /*
//     When Clicking on an item, setFromTier state
//         When moved





// */

// const Tierlist = () => {
//     const [options, setOptions] = useState(dummyOptions);
//     const [tierS, setTierS] = useState<optionPollForm[]>([]);
//     const [tierA, setTierA] = useState<optionPollForm[]>([]);
//     const [tierB, setTierB] = useState<optionPollForm[]>([]);
//     const [tierC, setTierC] = useState<optionPollForm[]>([]);
//     const [tierD, setTierD] = useState<optionPollForm[]>([]);
//     const [tierOpen, setTierOpen] = useState<optionPollForm[]>(dummyOptions);

//     const handleReorder = (setState) => (newOrder) => {
//         setState(newOrder);
//     };

//     const handleDragEnd = (event, info, item, fromTier, toTierSetter) => {
//         // Logic to determine if item should move to a different tier
//         // For example, based on position or if dropped over another Reorder.Group

//         // If it should move, update both `fromTier` and the `toTier` states
//         toTierSetter((prevTier) => [...prevTier, item]);
//         setFromTier((prevTier) => prevTier.filter(i => i.id !== item.id));
//     };

//     return (
//         <>
//             <h2 className='text-2xl'>TEST PAGE, NOTHING TO SEE IN HERE</h2>
//             <div className="tier-list flex flex-col gap-8">
//                 <div className="tier-row">
//                     <h2>S</h2>
//                     <Reorder.Group
//                         axis="y"
//                         values={tierS}
//                         onReorder={handleReorder(setTierS)}
//                     >
//                         {tierS.map((item) => (
//                             <Reorder.Item
//                                 value={item}
//                                 drag
//                                 key={JSON.stringify(item)}
//                                 onDragEnd={(event, info) => handleDragEnd(event, info, item, tierA, setTierS)}
//                             >
//                                 {item.title}
//                             </Reorder.Item>
//                         ))}
//                     </Reorder.Group>
//                 </div>

//                 <div className="tier-row">
//                     <h2>A</h2>
//                     <Reorder.Group
//                         axis="y"
//                         values={tierA}
//                         onReorder={handleReorder(setTierA)}
//                     >
//                         {tierA.map((item) => (
//                             <Reorder.Item
//                                 value={item}
//                                 drag
//                                 key={JSON.stringify(item)}
//                                 onDragEnd={(event, info) => handleDragEnd(event, info, item, tierS, setTierA)}
//                             >
//                                 {item.title}
//                             </Reorder.Item>
//                         ))}
//                     </Reorder.Group>
//                 </div>


//                 <div className="tier-row flex gap-10">
//                     <Reorder.Group
//                         className='grid-cols-[repeat(auto-fill,minmax(150px,1fr))] grid w-[500px] h-[300px] gap-4 mx-auto'
//                         axis="x"
//                         values={tierOpen}
//                         onReorder={setTierOpen}
//                     >
//                         {tierOpen.map((item) => (
//                             <Reorder.Item
//                                 className='w-full h-10 bg-red-200/20'
//                                 value={item}
//                                 drag
//                                 key={JSON.stringify(item)}
//                             // onDragEnd={(event, info) => handleDragEnd(event, info, item, tierOpen, setTierA)}
//                             >
//                                 {item.title}
//                             </Reorder.Item>
//                         ))}
//                     </Reorder.Group>
//                 </div>



//             </div>
//         </>
//     );
// };

// export default Tierlist