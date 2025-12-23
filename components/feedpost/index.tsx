import { GlobalButton } from "../ui/GlobalButton"
import { ArrowDown } from "lucide-react"
import FeedPost from "../feed/feed-post"

// Mock data for the feed
 const feedPosts = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "/professional-woman-avatar.png",
      },
      images: [
        "/community-cleanup-volunteers.png",
        "/environmental-cleanup-park.jpg",
        "/community-cleanup-volunteers.png",
      ],
      title: "Community Cleanup Drive",
      description:
        "Amazing turnout for our Saturday cleanup! 50+ volunteers helped clean up the local park. Join us next month for another exciting initiative!",
      category: "Environment",
      likes: 324,
      comments: 28,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      author: {
        name: "Mike Rodriguez",
        avatar: "/male-volunteer-avatar.jpg",
      },
      images: [
        "/kids-learning-in-classroom-volunteer-teaching.jpg",
        "/youth-mentorship-classroom.jpg",
        "/kids-learning-in-classroom-volunteer-teaching.jpg",
      ],
      title: "Literacy Program Success",
      description:
        "This month we taught reading skills to 30 children in the underserved community. Every child deserves access to quality education!",
      category: "Education",
      likes: 567,
      comments: 45,
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      author: {
        name: "Emma Wilson",
        avatar: "/elderly-woman-avatar.png",
      },
      image: "/volunteers-serving-food-at-community-shelter.jpg",
      title: "Food Drive Success",
      description:
        "Together we collected over 1000 meals for families in need. Your contribution makes a real difference! Thank you all!",
      category: "Charity",
      likes: 892,
      comments: 67,
      timestamp: "1 day ago",
    },
    {
      id: "4",
      author: {
        name: "James Chen",
        avatar: "/asian-man-avatar.png",
      },
      image: "/volunteers-building-homes-construction.jpg",
      title: "Housing Construction Project",
      description:
        "Our team helped build homes for 5 families this quarter. The joy on their faces is the best reward we could ask for!",
      category: "Housing",
      likes: 456,
      comments: 38,
      timestamp: "2 days ago",
    },
  ]


export default function FeedPosts() {
  return (
    <div>
      <div className="space-y-1">
        {feedPosts.map((post) => (
          <FeedPost key={post.id} {...post} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center py-8">
        <GlobalButton title="Load More Activities" icon={<ArrowDown/>}/>
      </div>
    </div>
  )
}