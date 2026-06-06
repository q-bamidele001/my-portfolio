'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  ArrowLeft,
  Upload,
  X,
  Save,
} from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export default function ProjectsManagement() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    liveUrl: '',
    githubUrl: '',
    image: '',
    imagePublicId: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('folder', 'portfolio/projects');

      const res = await fetch('/api/cloudinary', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        return { url: data.url, publicId: data.publicId };
      }
      throw new Error('Upload failed');
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image;
    let imagePublicId = formData.imagePublicId;

    // Upload new image if selected
    if (imageFile) {
      const uploadResult = await uploadImage();
      if (!uploadResult) return;
      imageUrl = uploadResult.url;
      imagePublicId = uploadResult.publicId;
    }

    const techArray = formData.tech.split(',').map((t) => t.trim());

    const projectData = {
      ...(editingId && { id: editingId }),
      title: formData.title,
      description: formData.description,
      tech: techArray,
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      image: imageUrl,
      imagePublicId,
    };

    try {
      const res = await fetch('/api/projects', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        resetForm();
        fetchProjects();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      image: project.image,
      imagePublicId: '',
    });
    setImagePreview(project.image);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tech: '',
      liveUrl: '',
      githubUrl: '',
      image: '',
      imagePublicId: '',
    });
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 px-3 py-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
          <div className="min-w-0">
            <button
              onClick={() => router.push('/admin')}
              className="text-blue-400 hover:text-blue-300 transition-colors mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-3">
              <FolderKanban className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
              Manage Projects
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </motion.button>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 px-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No projects yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all min-w-0"
              >
                <div className="relative h-44 sm:h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="break-words text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col min-[380px]:flex-row gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(project)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500 text-blue-400 rounded-lg transition-all text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </motion.button>


                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(project.id)}
                      aria-label={`Delete ${project.title}`}
                      className="flex min-[380px]:w-auto items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-400 rounded-lg transition-all text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={() => !uploadingImage && resetForm()}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gray-800 rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {editingId ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button
                    onClick={resetForm}
                    disabled={uploadingImage}
                    className="flex-shrink-0 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full min-w-0 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
                      placeholder="My Awesome Project"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                      rows={3}
                      className="w-full min-w-0 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white resize-none outline-none"
                      placeholder="Project description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Technologies (comma-separated) *
                    </label>
                    <input
                      type="text"
                      value={formData.tech}
                      onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                      required
                      className="w-full min-w-0 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
                      placeholder="React, Next.js, TypeScript, MongoDB"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Live URL *
                      </label>
                      <input
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, liveUrl: e.target.value })
                        }
                        required
                        className="w-full min-w-0 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        GitHub URL *
                      </label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, githubUrl: e.target.value })
                        }
                        required
                        className="w-full min-w-0 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white outline-none"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Image *
                    </label>
                    {imagePreview ? (
                      <div className="relative">
                        <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Project image preview"
                            fill
                            sizes="100vw"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview('');
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors px-4 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-400">Click to upload image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={uploadingImage}
                      className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploadingImage || (!imagePreview && !editingId)}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {uploadingImage ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          {editingId ? 'Update' : 'Create'} Project
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
