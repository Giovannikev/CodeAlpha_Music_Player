import bell_icon from '@/assets/bell.png'
import home_icon from '@/assets/home.png'
import like_icon from '@/assets/like.png'
import loop_icon from '@/assets/loop.png'
import mic_icon from '@/assets/mic.png'
import next_icon from '@/assets/next.png'
import play_icon from '@/assets/play.png'
import pause_icon from '@/assets/pause.png'
import plays_icon from '@/assets/plays.png'
import prev_icon from '@/assets/prev.png'
import search_icon from '@/assets/search.png'
import shuffle_icon from '@/assets/shuffle.png'
import speaker_icon from '@/assets/speaker.png'
import stack_icon from '@/assets/stack.png'
import zoom_icon from '@/assets/zoom.png'
import plus_icon from '@/assets/plus.png'
import arrow_icon from '@/assets/arrow.png'
import mini_player_icon from '@/assets/mini-player.png'
import queue_icon from '@/assets/queue.png'
import volume_icon from '@/assets/volume.png'
import arrow_right from '@/assets/right_arrow.png'
import arrow_left from '@/assets/left_arrow.png'
import spotify_logo from '@/assets/spotify_logo.png'
import clock_icon from '@/assets/clock_icon.png'
import img11 from '@/assets/img11.jpg'
import img12 from '@/assets/img12.jpg'
import img14 from '@/assets/img14.jpg'
import img15 from '@/assets/img15.jpg'
import img16 from '@/assets/img16.jpg'
import song1 from '@/assets/song1.mp3'
import song2 from '@/assets/song2.mp3'
import song3 from '@/assets/song3.mp3'
import chris from '@/assets/chris.jpg'
import chris1 from '@/assets/chris2.jpg'
import chris3 from '@/assets/chris4.jpg'
import chris4 from '@/assets/chris6.jpg'
import album1 from '@/assets/album_cover1.jpg'
import album2 from '@/assets/album_cover2.jpg'
import album3 from '@/assets/album_cover3.jpg'
import chris_press_me from '@/assets/Chris_Brown_-_Press_Me__Visualizer_(256k).mp3'
import chris_angels_number from '@/assets/Chris_Brown_-_Angel_Numbers___Ten_Toes__Visualizer_(256k).mp3'
import chris_nightmares from '@/assets/Chris_Brown_-_Nightmares__Official_Video__ft._Byron_Messia(256k).mp3'
import chris_shouldve_kissed_you from '@/assets/Chris_Brown_-_Should_ve_Kissed_You__Official_Video_(256k).mp3'
import type { Album, Song, Assets } from "@/types/assets"


export const assets: Assets = {
      bell_icon: bell_icon,
      home_icon: home_icon,
      like_icon: like_icon,
      loop_icon: loop_icon,
      mic_icon: mic_icon,
      next_icon: next_icon,
      play_icon: play_icon,
      plays_icon: plays_icon,
      prev_icon: prev_icon,
      search_icon: search_icon,
      shuffle_icon: shuffle_icon,
      speaker_icon: speaker_icon,
      stack_icon: stack_icon,
      zoom_icon: zoom_icon,
      plus_icon: plus_icon,
      arrow_icon: arrow_icon,
      mini_player_icon: mini_player_icon,
      volume_icon: volume_icon,
      queue_icon: queue_icon,
      pause_icon: pause_icon,
      arrow_left: arrow_left,
      arrow_right: arrow_right,
      spotify_logo: spotify_logo,
      clock_icon: clock_icon,
}

export const albumsData: Album[] = [
      {
            id: 0,
            name: "11:11 deluxe",
            image: album1,
            description: "Your weekly update of the most played tracks",
            bgColor: "#2a4365",
            dateAdded: "12/04/24",
      },
      {
            id: 1,
            name: "X",
            image: album2,
            description: "Your weekly update of the most played tracks",
            bgColor: "#5594CC",
            dateAdded: "12/04/24",
      },
      {
            id: 2,
            name: "Breezy",
            image: album3,
            description: "Your weekly update of the most played tracks",
            bgColor: "#CCCCCC",
            dateAdded: "12/04/24",
      },
      {
            id: 3,
            name: "Trending Global",
            image: img14,
            description: "Your weekly update of the most played tracks",
            bgColor: "#44337a",
            dateAdded: "12/04/24",
      },
      {
            id: 4,
            name: "Mega Hits",
            image: img15,
            description: "Your weekly update of the most played tracks",
            bgColor: "#234e52",
            dateAdded: "12/04/24",
      },
      {
            id: 5,
            name: "Happy Favorites",
            image: img16,
            description: "Your weekly update of the most played tracks",
            bgColor: "#744210",
            dateAdded: "12/04/24",
      },
]

export const songsData: Song[] = [
      {
            id: 0,
            name: "Chris Brown",
            title: "Press me",
            image: chris,
            file: chris_press_me,
            description: "Put a smile on your face with these happy tunes",
            duration: "3:00",
            category: "R&B"
      },
      {
            id: 1,
            name: "Chris Brown",
            title: "Angels number",
            image: chris1,
            file: chris_angels_number,
            description: "Put a smile on your face with these happy tunes",
            duration: "2:20",
            category: "R&B"
      },
      {
            id: 2,
            name: "Chris Brown",
            title: "Nightmares",
            image: chris3,
            file: chris_nightmares,
            description: "Put a smile on your face with these happy tunes",
            duration: "2:32",
            category: "R&B"
      },
      {
            id: 3,
            name: "Chris Brown",
            image: chris4,
            title: "Should've kissed you",
            file: chris_shouldve_kissed_you,
            description: "Put a smile on your face with these happy tunes",
            duration: "2:50",
            category: "R&B"
      },
      {
            id: 4,
            name: "Song Five",
            title: "Title",
            image: img15,
            file: song2,
            description: "Put a smile on your face with these happy tunes",
            duration: "3:10",
            category: "Soul"
      },
      {
            id: 5,
            name: "Song Six",
            title: "Title",
            image: img14,
            file: song3,
            description: "Put a smile on your face with these happy tunes",
            duration: "2:45",
            category: "Soul"
      },
      {
            id: 6,
            name: "Song Seven",
            title: "Title",
            image: img12,
            file: song1,
            description: "Put a smile on your face with these happy tunes",
            duration: "2:18",
            category: "Soul"
      },
      {
            id: 7,
            name: "Song Eight",
            title: "Title",
            image: img11,
            file: song2,
            description: "Put a smile on your face with these happy tunes",
            duration: "2:35",
            category: "Soul"
      },
]


