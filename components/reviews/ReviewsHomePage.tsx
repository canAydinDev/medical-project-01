"use client";
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { fetchAllReviews } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import Image from "next/image";

type Review = {
  comment: string;
  rating: number;
  authorImageUrl: string;
  dlModel: {
    name: string;
    image: string;
  };
};

function ReviewsHomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchAllReviews();
        setReviews(data);
      } catch (error) {
        console.error("Yorumları alırken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  if (reviews.length === 0) {
    return <EmptyList heading="Henüz hiç yorum yapılmadı" />;
  }

  return (
    <>
      {reviews.map((review, i) => {
        const { comment, rating, authorImageUrl } = review || {};
        const { name, image } = review.dlModel;

        const reviewInfo = {
          comment,
          rating,
          name,
          image,
        };

        return (
          <ReviewCard key={i} reviewInfo={reviewInfo}>
            <Image
              src={authorImageUrl}
              alt="Yorum yapan kişinin resmi"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          </ReviewCard>
        );
      })}
    </>
  );
}

export default ReviewsHomePage;
