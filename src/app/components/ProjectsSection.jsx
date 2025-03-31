"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Botas color café",
    description: "Marca Nike",
    image: "/images/projects/p3.jpg",
    tag: ["All", "Botas"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Botas negras",
    description: "Marca Zara",
    image: "/images/projects/p2.jpg",
    tag: ["All", "Botas"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Tenis color negro",
    description: "Marca Adidas",
    image: "/images/projects/tenis.png",
    tag: ["All", "Tenis"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Tenis color azul",
    description: "Marca Nike",
    image: "/images/projects/tenis2.jpg",
    tag: ["All", "Tenis"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Tenis color plomo",
    description: "Marca Adidas",
    image: "/images/projects/TENIS3.jpg",
    tag: ["All", "Tenis"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Tenis color negro",
    description: "Marca Nike",
    image: "/images/projects/tenis5.jpg",
    tag: ["All", "Botas"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Products
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Botas"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Tenis"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
