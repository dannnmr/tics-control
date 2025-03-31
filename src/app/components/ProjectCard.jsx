"use client";
import React, { useState } from "react";
import {
  CodeBracketIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  TrashIcon,
  ShareIcon, // Importamos el ícono de compartir
} from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingComment, setEditingComment] = useState("");

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditingComment(comments[index]);
  };

  const handleSaveEdit = () => {
    const updatedComments = comments.map((comment, index) =>
      index === editingIndex ? editingComment : comment
    );
    setComments(updatedComments);
    setEditingIndex(null);
    setEditingComment("");
  };

  const handleShare = () => {
    const shareUrl = "https://tics-control.vercel.app/"; // Obtiene la URL actual
    const message = `¡Mira este producto increíble! ${title} - ${description}. Puedes verlo aquí: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/59168183484?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
          </Link>
          <Link
            href={previewUrl}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>

        {/* Like Section */}
        <div className="flex items-center mt-4">
          <button
            onClick={handleLike}
            className="flex items-center text-[#ADB7BE] hover:text-white"
          >
            <HeartIcon className="h-6 w-6 mr-2" />
            <span>{likes} Me gusta</span>
          </button>
        </div>

        {/* Share Section */}
        <div className="flex items-center mt-4">
          <button
            onClick={handleShare}
            className="flex items-center text-[#ADB7BE] hover:text-white"
          >
            <ShareIcon className="h-6 w-6 mr-2" />
            <span>Compartir</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h6 className="text-lg font-semibold mb-2">Comentarios</h6>
          <div className="space-y-2">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-[#ADB7BE] bg-[#252525] p-2 rounded"
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editingComment}
                    onChange={(e) => setEditingComment(e.target.value)}
                    className="flex-1 bg-[#181818] text-white p-2 rounded outline-none"
                  />
                ) : (
                  <p>{comment}</p>
                )}
                <div className="flex space-x-2">
                  {editingIndex === index ? (
                    <button
                      onClick={handleSaveEdit}
                      className="text-green-500 hover:text-green-700"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditComment(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteComment(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 bg-[#252525] text-white p-2 rounded-l outline-none"
            />
            <button
              onClick={handleAddComment}
              className="bg-[#ADB7BE] text-black px-4 rounded-r hover:bg-white"
            >
              Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
