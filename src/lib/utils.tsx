import { Genre, Poll, PollType } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import { FaDog, FaPaintBrush, FaBookOpen, FaUsers, FaHamburger, FaGamepad, FaMusic, FaTree, FaLaptopCode, FaSuitcase, FaTv, FaQuestion } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";
import { FaBaseball, FaShirt } from "react-icons/fa6";
import { optionPollForm, tournyResult } from "./models";
import { bracketMatch } from "@/components/poll/Bracket/BracketModels";
import { CiBoxList } from "react-icons/ci";
import { TbTournament } from "react-icons/tb";
import { PiRankingDuotone } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
// zod 


export const formSchema = z.object({
  title: z.string().trim().min(2).max(40),
  type: z.enum(["video", "image"]).default('image'),
  image: z.optional(z.string().trim().url()).refine((val) => { return (val ? isImage(val as string) : true) }, { message: 'Source must be a valid image file (jpeg, jpg, gif, png, webp, bmp, svg)' }),
  style: z.nativeEnum(PollType).default('VOTE'),
  genre: z.enum(["ANIMALS", "ANIME", "ART", "BOOKS", "FOOD", "GAMING", "TV", "SPORT", "MUSIC", "NATURE", "TECH", "TRAVEL", "STYLE", "OTHER"]),
  additionalField: z.union([
    z.number().min(1).max(10).int(),
    z.enum(["random", "order"])
  ])
})

// Helper functions to validate image and YouTube URL
export const isImage = (value: string) => /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(value);
const isYouTubeUrl = (value: string) =>
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i.test(value);

export const optionSchema = z.object({
  title: z.string().trim().min(1).max(40),
  source: z.enum(['image', 'video']), // Determines if it's an image or a YouTube video
  src: z.string().trim().max(400)
}).superRefine((data, ctx) => {
  const { source, src } = data;

  if (source === 'image' && !isImage(src)) {
    ctx.addIssue({
      code: 'custom',        // Add the 'code' field to indicate custom validation
      path: ['src'],         // Field causing the issue
      message: 'Source must be a valid image file (jpeg, jpg, gif, png, webp, bmp, svg)',
    });
  } else if (source === 'video' && !isYouTubeUrl(src)) {
    ctx.addIssue({
      code: 'custom',        // Add the 'code' field to indicate custom validation
      path: ['src'],         // Field causing the issue
      message: 'Source must be a valid YouTube video URL',
    });
  }
});

export function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^?&/]+)/);
  return match ? match[1] : null;
}



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dummyPoll: Poll = {
  id: "cm1arkjmz0004ywh7psfuo2xn",
  title: 'Dummy Poll Title',
  createdAt: new Date("2024-09-20T13:36:02.411Z"),
  isVideo: false,
  submissions: 24,
  additionalField: 3,
  totalScore: [],
  winsCount: [0],
  totalDuels: [],
  type: 'TOURNY',
  options: `[{\"title\":\"0\",\"source\":\"image\",\"src\":\"https://randomwordgenerator.com/img/picture-generator/55e1d3474f53ab14f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.jpg\"},{\"title\":\"1\",\"source\":\"image\",\"src\":\"https://randomwordgenerator.com/img/picture-generator/55e1d3474f53ab14f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.jpg\"},{\"title\":\"2\",\"source\":\"image\",\"src\":\"https://randomwordgenerator.com/img/picture-generator/55e1d3474f53ab14f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.jpg\"},{\"title\":\"3\",\"source\":\"image\",\"src\":\"https://randomwordgenerator.com/img/picture-generator/55e1d3474f53ab14f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.jpg\"},{\"title\":\"4\",\"source\":\"image\",\"src\":\"https://randomwordgenerator.com/img/picture-generator/55e1d3474f53ab14f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.jpg\"},{\"title\":\"5\",\"source\":\"image\",\"src\":\"https://randomwordgenerator.com/img/picture-generator/55e1d3474f53ab14f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.jpg\"},{\"title\":\"6\",\"source\":\"image\",\"src\":\"https://randomwordgenerator.com/img/picture-generator/55e1d3474f53ab14f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.jpg\"},{\"title\":\"7\",\"source\":\"image\",\"src\":\"https://randomwordgenerator.com/img/picture-generator/55e1d3474f53ab14f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.jpg\"}]`,
  genre: 'SPORT',
  src: "https://randomwordgenerator.com/img/picture-generator/54e3d0404a54ae14f1dc8460962e33791c3ad6e04e50744074297cd79e4cc1_640.jpg"
}

export const genreToEmoji = (genre: Genre): JSX.Element => {
  switch (genre) {
    case 'ANIMALS':
      return <FaDog />; // Return a JSX element
    case 'ANIME':
      return <MdCatchingPokemon />
    case 'ART':
      return <FaPaintBrush />
    case 'BOOKS':
      return <FaBookOpen />
    case 'FOOD':
      return <FaHamburger />
    case 'GAMING':
      return <FaGamepad />
    case 'MUSIC':
      return <FaMusic />
    case 'NATURE':
      return <FaTree />
    case 'SPORT':
      return <FaBaseball />
    case 'STYLE':
      return <FaShirt />
    case 'TECH':
      return <FaLaptopCode />
    case 'TRAVEL':
      return <FaSuitcase />
    case 'TV':
      return <FaTv />
    case 'OTHER':
      return <FaQuestion />
    case 'PEOPLE':
      return <FaUsers />


    default:
      return <div>genre</div>
  }
}

const genreColor = (genre: Genre): string => {
  switch (genre) {
    case 'ANIMALS':
      return '#5fccd8'
    case 'ANIME':
      return '#60a5fa'
    case 'ART':
      return '#f87171';
    case 'BOOKS':
      return '#facc15';
    case 'FOOD':
      return '#fb923c';
    case 'GAMING':
      return '#2dd4bf';
    case 'MUSIC':
      return '#a78bfa';
    case 'NATURE':
      return '#4ade80';
    case 'SPORT':
      return '#34d399';
    case 'STYLE':
      return '#fb7185';
    case 'TECH':
      return '#818cf8';
    case 'TRAVEL':
      return '#38bdf8';
    case 'TV':
      return '#d8b87f';
    case 'PEOPLE':
      return '#d09925'

    default:
      return '#a3a3a3'

  }
}

export const getGenreBackground = (genre: Genre): string => {
  return (genreColor(genre));
}

export const getAnsweredPolls = (): string[] => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('polls') ?? '[]') as string[];

}


export const addPollToLocalStorage = (pollId: string) => {
  if (typeof window === 'undefined') return;
  const polls = getAnsweredPolls();
  if (!polls.includes(pollId)) polls.push(pollId);
  localStorage.setItem('polls', JSON.stringify(polls));
}

export const getHotLevelColor = (percentage: number): string => {
  // Clamp the input between 0 and 100 to avoid invalid values
  const clampedPercentage = Math.max(0, Math.min(percentage, 100));

  // Calculate the red and blue values based on the percentage
  const red = Math.round((clampedPercentage / 100) * 255); // From 0 to 255 as percentage increases
  const blue = Math.round(((100 - clampedPercentage) / 100) * 255); // From 255 to 0 as percentage increases

  // Return the color in hex format
  return `#${((1 << 24) + (red << 16) + (0 << 8) + blue).toString(16).slice(1).toUpperCase()}`;
}

export const getDateString = (createdAt: Date): string => {
  const day = String(createdAt.getDate()).padStart(2, '0');
  const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = createdAt.getFullYear();

  return `${day}-${month}-${year}`;
}
export const generateRandomColor = (): string => {
  // Generate a random number between 0 and 16777215 (0xFFFFFF in hex)
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // Ensure the color code is 6 digits long by padding with leading zeros if necessary
  while (randomColor.length < 6) {
    randomColor = '0' + randomColor;
  }

  // Convert hex to RGB
  const r = parseInt(randomColor.substring(0, 2), 16);
  const g = parseInt(randomColor.substring(2, 4), 16);
  const b = parseInt(randomColor.substring(4, 6), 16);

  // Set the desired opacity (0 to 1)
  const opacity = 0.3; // 50% opacity

  // Return the color as an rgba string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
export const pollFetchSchema = z.object({
  genre: z.nativeEnum(Genre).optional(),
  skip: z.string().default('0').transform((val) => parseInt(val)),
  take: z.string().default('10').transform((val) => parseInt(val)),
  orderby: z.enum(['popular', 'newest', 'oldest']).default('newest'),
  date: z.enum(['day', 'week', 'month', 'all']).default('all'),
  match: z.string().optional()
});
export const getDateRange = (date: 'day' | 'week' | 'month' | 'all') => {
  const now = new Date();
  let startDate;

  switch (date) {
    case 'day':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 1);
      break;
    case 'week':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'all':
    default:
      startDate = undefined; // No date filter for 'all'
  }

  return { startDate, endDate: now };
};

// get X randomize from Array of elements.
export function getRandomElementsFromArray<T>(arr: T[], count: number): T[] {
  if (arr.length <= count) return arr;
  // Create a copy of the original array to avoid mutating it
  const arrCopy = [...arr];

  // Result array to store the selected elements
  const result: T[] = [];

  // Loop to select `count` number of random elements
  for (let i = 0; i < count; i++) {
    // Check if there are still elements to pick from
    if (arrCopy.length === 0) break;

    // Get a random index
    const randomIndex = Math.floor(Math.random() * arrCopy.length);

    // Push the randomly selected element to the result array
    result.push(arrCopy[randomIndex]);

    // Remove the selected element from the original copy to avoid picking it again
    arrCopy.splice(randomIndex, 1);
  }

  return result;
}


export const getStageMatches = (stage: number, initialOptions: number): number => {
  if (stage < 0) return 0;
  return initialOptions / Math.pow(2, stage) / 2;
}

export const getStageNameByOptionsAmount = (totalOptions: number, index: number): string => {
  const totalStages = Math.log2(totalOptions);
  switch (index) {
    case totalStages - 1:
      return 'Finals';
    case totalStages - 2:
      return 'Semi Finals';
    case totalStages - 3:
      return 'Quarter Finals';
    default:
      return 'Best of ' + getStageMatches(index, totalOptions) * 2; // each match 2 options
  }
}

const dummyPollItem: optionPollForm = {
  title: 'TBD',
  source: 'image',
  src: '',
}

// this function initializes an empty stage or stage with options without results.
// give empty array of options to set to "TBD", make sure options length is 2^X
export const getEmptyStageData = (options: optionPollForm[], stage: number, optionsCount: number): bracketMatch[] => {
  // calculate how many matches in the stage
  const stageMatches = getStageMatches(stage, optionsCount);
  const matches: bracketMatch[] = [];
  // for each match fill in dummy information.
  let added = 0;
  for (let i = 0; i < stageMatches; i++) {
    const match: bracketMatch = {
      first: options[added] ?? dummyPollItem,
      second: options[added + 1] ?? dummyPollItem,
      winnerTitle: ''
    }
    added += 2;
    matches[i] = match;
  }
  return matches;
}
export const getTournyResults = (stages: bracketMatch[][], initialArray: optionPollForm[]): tournyResult => {
  const winsCount: number[] = Array(initialArray.length).fill(0); // Initialize with 0s
  const duelCount: number[] = Array(initialArray.length).fill(0); // Initialize with 0s

  const initialTitleArr = initialArray.map(option => option.title); // Array of titles

  stages.forEach(stage => {
    stage.forEach(match => {
      const firstIndex = initialTitleArr.indexOf(match.first.title);  // Find index for the first match
      const secondIndex = initialTitleArr.indexOf(match.second.title); // Find index for the second match
      const winnerIndex = initialTitleArr.indexOf(match.winnerTitle);  // Find index for the winner

      // Increment duel counts if the indices are valid
      if (firstIndex !== -1) duelCount[firstIndex]++;
      if (secondIndex !== -1) duelCount[secondIndex]++;

      // Increment wins count if the index for the winner is valid
      if (winnerIndex !== -1) winsCount[winnerIndex]++;
    });
  });

  return { winsCount, duelCount };
};

export const getTitleFromType = (title: PollType): string => {
  switch (title) {
    case 'TIER_LIST': return 'Tier List';
    case 'TOURNY': return 'Tourny';
    case 'VOTE': return 'Vote';
    default: return 'Timed Tourny';
  }
}
export const getPollTypeFromTitle = (title: string): PollType => {
  switch (title) {
    case 'Tier List': return 'TIER_LIST'
    case 'Tourny': return 'TOURNY'
    case 'Vote': return 'VOTE'
    default: return 'TIMED_TOURNY'
  }
}
export const getPollTitleFromType = (title: PollType): string => {
  switch (title) {
    case 'TIER_LIST': return 'Tier List'
    case 'TOURNY': return 'Tourny'
    case 'VOTE': return 'Vote'
    default: return 'Timed'
  }
}

export const getPollIconFromType = (type: PollType): JSX.Element => {
  switch (type) {
    case 'TIER_LIST': return <CiBoxList />;
    case 'TOURNY': return <TbTournament />;
    case 'VOTE': return <PiRankingDuotone />;
    default: return <IoMdTime />;
  }
}