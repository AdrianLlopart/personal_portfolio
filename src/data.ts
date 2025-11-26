export interface MediaLinks {
    videoUrls?: string[];
    websiteUrl?: string;
    pdfUrl?: string;
    slidesUrl?: string;
    codeUrl?: string;
}

export interface BaseItem extends MediaLinks {
    title: string;
    description: string;
    date: string;
    tags: string[];
}

export interface Project extends BaseItem {
    id: string;
}

export interface Experience extends MediaLinks {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string; // "Present" or date
    description: string;
    tags: string[];
    location: string;
    relatedProjectIds?: string[];
    relatedPaperIds?: string[];
    longDescription?: string;
    logoUrl: string;
}

export interface Education extends MediaLinks {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
    location: string;
    tags: string[];
    relatedProjectIds?: string[];
    relatedPaperIds?: string[];
    longDescription?: string;
    logoUrl: string;
}

export interface Research extends BaseItem {
    id: string;
    publication: string;
    authors?: string[];
    location: string;
}

export const projects: Project[] = [
    {
        id: "kinokraft",
        title: "KinokraftAI - AI Agents for Gen AI Media Creation",
        description:
            `KinoKraftAI is a comprehensive web application designed for AI-driven media creation and manipulation, offering tools for processing images, video, and audio through a conversational interface. The platform leverages Large Language Models (LLMs) to facilitate user interactions, allowing for complex media editing tasks and project management within a unified workspace. It features a robust architecture that integrates secure user authentication via Firebase and subscription management through Stripe. The system is built for scalability using containerization and infrastructure-as-code principles to ensure reliable deployment and performance.

**Tech Stack**
- Frontend:
1. Framework: React
2. Language: TypeScript
3. Build Tool: Vite
4. Styling: Tailwind CSS, PostCSS
5. State/Services: Firebase SDK, Stripe.js

- Backend:
1. Language: Python
2. Framework: FastAPI
3. AI/ML: LLM Integration, Custom AI Media Tools (Audio, Image, Video)
4. Database/Storage: Firebase Admin SDK, SQL
5. Infrastructure & DevOps: Docker, Terraform, GitHub Actions`,
        date: "2025",
        tags: ["Agents", "Docker", "FastAPI", "Firebase", "GenAI", "LLMs", "Render", "Scaleway", "Stripe", "Tailwind", "Terraform", "TypeScript"],
        codeUrl: "https://github.com/KinoKraft",
        videoUrls: ["videos/kinokraft_demo.mp4"]
    },
    {
        id: "ast-doa",
        title: "Active Speaker Detection and Direction of Arrival",
        description: "Demo of the integration of multiple AI models (YoloV11, OSNet, BoxMot, LR-ASD, DOA) in a real-time Gstreamer processing pipeline.",
        date: "2025",
        tags: ["AI", "Audio", "CNN", "DOA", "Docker", "Gstreamer", "Multimodal", "ML", "Python"],
        pdfUrl: "images/ast-doa.pdf",
        videoUrls: ["https://youtu.be/xF5U0_ZPrLA"]
    },
    {
        id: "webshop",
        title: "Webshop for Accoustic Frames",
        description: `Full-stack e-commerce platform dedicated to the sale and customization of acoustic frames and whiteboards. The application features a React-based frontend that includes a product customizer, shopping cart, and user account management. It is powered by a Node.js and Express backend that handles API requests, authentication, and data management for products and orders. The project is designed to offer a seamless user experience for customers looking to tailor specific acoustic solutions to their needs.

**Tech Stack**
- Frontend: React, TypeScript, React Router
- Backend: Node.js, TypeScript
- Database: MongoDB
- Utilities: Nodemailer, Google Maps API`,
        date: "2025",
        tags: ["e-commerce", "MongoDB", "Node.js", "React", "TypeScript"],
        codeUrl: "https://github.com/AdrianLlopart/prebenlunde-webshop",
        slidesUrl: "images/webshop.png"
    },
    {
        id: "table-cleaner",
        title: "Table Cleaning using a UR10 Robot Arm",
        description: "System that recognizes cutlery and dishes from a kinects video stream using CNNs (YOLO framewrok). It the generates the objects pointcloud and obtains suitable grasping positions. Finally it uses a UR10 robot arm to plan and move to the desired grasping locations.",
        date: "2016",
        tags: ["AI", "CNN", "C++", "Grasping", "ML", "PCL", "Robotics", "ROS"],
        codeUrl: "https://github.com/Allopart/table_cleaner_ur10",
        slidesUrl: "images/table_cleaner.png"
    },
    {
        id: "rbpf",
        title: "Rao-Blackwellized Particle Filter for Grid- Based FastSlam",
        description: "MATLAB implementation of Rao-Blackwellized Particle Filter SLAM, covering map creation, motion modelling, and the full RBPF-SLAM pipeline including scan-matching, particle weighting, and resampling. It describes how simulated odometry and laser data are generated, how particle poses and occupancy grids are updated, and how improved proposal distributions allow accurate SLAM with very few particles.",
        date: "2016",
        tags: ["AI", "ML", "Matlab", "Robotics", "SLAM"],
        codeUrl: "https://github.com/Allopart/rbpf-gmapping",
        pdfUrl: "papers/rbpf.pdf",
        slidesUrl: "presentations/rbpf_users_guide.pdf"
    }



];

export const research: Research[] = [
    {
        id: "liftformer",
        title: "LiftFormer: 3D Human Pose Estimation using attention models",
        description: "Transformer-based model that leverages temporal attention on sequences of 2D human poses to generate more accurate 3D joint predictions. It achieves state-of-the-art results on multiple benchmarks with fewer parameters than prior methods, outperforming previous best models on Human3.6M and HumanEva-I",
        date: "September 2020",
        location: "United Kingdom",
        tags: ["AI", "ML", "Pose Estimation", "Transformers"],
        publication: "arXiv:2009.00348",
        pdfUrl: "https://arxiv.org/pdf/2009.00348"
    },
    {
        id: "maritime",
        title: "Outlook for navigation-comparing human performance with a robotic solution",
        description: "Comparing human visual lookout with an electronic outlook system by tracking navigator gaze using eye-tracking and benchmarking it against machine-learning-based object detection from electro-optical sensors. It outlines methods for inferring human attention to objects and evaluates the electronic system’s detection and classification performance using statistical quality measures.",
        date: "November 2018",
        location: "South Korea",
        tags: ["AI", "CNN", "ML", "MaritimeTech", "Segmentation"],
        publication: "Proceedings of the 1st International Conference on Maritime Autonomous Surface Ships (ICMASS)",
        pdfUrl: "papers/maritime.pdf",
        videoUrls: ["https://youtu.be/_vmKbbW1FuM"],
        codeUrl: "https://github.com/Allopart/Maritme_Mask_RCNN"
    },
    {
        id: "task-intelligence",
        title: "Online Semantic Segmentation and Manipulation of Objects in Task Intelligence for Service Robots",
        description: "A new perceptual pipeline enables robots to detect, segment, and grasp previously unknown objects using CNN-based recognition and 3D point-cloud processing. Integrated with Deep-ART memory, FF-planner, and trajectory warping, the system executes adaptive Task Intelligence behaviors in dynamic environments.",
        date: "November 2018",
        location: "Singapore",
        tags: ["3D", "AI", "CNN", "Grasping", "Humanoid", "ML", "Planning", "Robotics"],
        publication: "The 15th International Conference on Control, Automation, Robotics and Vision (ICARCV)",
        pdfUrl: "papers/task-intelligence.pdf",
        slidesUrl: "images/task-intelligence.pdf",
        videoUrls: ["https://youtu.be/XQtiLE5DmF8"],
    },
    {
        id: "semantic-mapping",
        title: "Semantic mapping and object detection for indoor mobile robots",
        description: "Semantic perception system for indoor mobile robots that segments images with Mask-RCNN, integrates them with RTAB-Map SLAM, and produces object-level semantic point clouds. The system identifies each object’s location, class, and shape, enabling safer navigation and richer interaction, with experiments validating performance and highlighting improvements.",
        date: "November 2018",
        location: "Thailand",
        tags: ["AI", "CNN", "ML", "Navigation", "ROS", "Robotics", "SLAM", "Segmentation"],
        publication: "Industrial Conference on Robotics and Computer Vision (ICRCV)",
        pdfUrl: "papers/semantic-mapping.pdf",
        slidesUrl: "presentations/semantic-mapping.pdf",
        videoUrls: ["https://youtu.be/BYbUQk4gttw"]
    },
    {
        id: "teleoperated-arm",
        title: "A Rule-Based Approach for Constrained Motion Control of a Teleoperated Robot Arm in a Dynamic Environment",
        description: "A modular ROS-based robotic architecture for constrained teleoperation that uses a reasoning agent to enable reactive, context-aware, and collision-avoiding control in dynamic environments. Experiments on real and simulated systems show a robot that adapts its motion despite interruptions, achieving a 99% success rate.",
        date: "October 2018",
        location: "Spain",
        tags: ["Control", "ROS", "Robotics", "Teleoperation"],
        publication: "The International Conference on Robotics Systems and Automation Engineering (RSAE)",
        pdfUrl: "papers/teleoperated-arm.pdf",
        slidesUrl: "presentations/teleoperated-arm.pdf"
    },
    {
        id: "bayes",
        title: "Bayesian Convolutional Neural Networks with Variational Inference",
        description: "Bayesian CNNs using variational inference via Bayes by Backprop, enabling uncertainty estimation and natural regularization while matching the accuracy of standard CNNs on multiple datasets. It extends variational Bayesian methods to convolutional architectures and analyzes predictive variance into aleatoric and epistemic components.",
        date: "November 2018",
        location: "Denmark",
        tags: ["AI", "Bayesian", "ML"],
        publication: "arXiv:1806.05978v5 ",
        pdfUrl: "papers/bayes.pdf",
    },
    {
        id: "3d-model-objects",
        title: "Autonomous 3D model generation of unknown objects for dual-manipulator humanoid robots",
        description: "Autonomous method for generating 3D models of unknown objects by having a dual-manipulator robot reorient the object, collect RGB-D views, and register filtered point clouds using Normal ICP. By switching the object between hands to eliminate occlusions, the system merges partial reconstructions and produces a final triangulated mesh without prior knowledge or external aids",
        date: "December 2017",
        location: "South Korea",
        tags: ["3D", "CV", "Grasping", "Humanoid", "ICP", "PCL", "Robotics"],
        publication: "IEEE 5th International Conference on Robot Intelligence Technology and Applications (RITA)",
        pdfUrl: "papers/3d-model-objects.pdf",
        slidesUrl: "presentations/3d-model-objects.pdf",

    },
    {
        id: "perception-ai",
        title: "Generalized Framework for the Parallel Semantic Segmentation of Multiple Objects and Posterior Manipulation",
        description: "End-to-end pipeline for recognizing, segmenting, modeling, and grasping previously unknown objects, combining real-time CNN detection, ROI point-cloud extraction, multi-stage segmentation, temporal registration, and geometry-based grasp pose estimation. Implemented on the MyBot humanoid robot, the system performs collision-aware grasp execution and object relocation using the generated 3D models.",
        date: "December 2017",
        location: "Macao",
        tags: ["3D", "AI", "CNN", "CV", "Grasping", "Humanoid", "ML", "PCL", "Robotics", "Segmentation"],
        publication: "IEEE International Conference on Robotics and Biomimetics (ROBIO)",
        pdfUrl: "papers/perception-ai.pdf",
        videoUrls: ["https://youtu.be/cmANQdS_-Zk", "https://youtu.be/HLzFLMktIYc"],
        codeUrl: "https://github.com/Allopart/semantic_mapping_and_manipulation"
    },
    {
        id: "door-recognition",
        title: "Door and Cabinet Recognition Using Convolutional Neural Nets and Real-time Method Fusion for Handle Detection and Grasping",
        description: "Method for detecting doors, cabinets, and their handles by combining CNN-based ROI extraction with point-cloud analysis and plane segmentation. The fused system provides precise 3D handle features for grasping and is deployed on a mobile robot without requiring prior environmental knowledge.",
        date: "April 2017",
        location: "Japan",
        tags: ["3D", "AI", "CNN", "CV", "Grasping", "ML", "PCL", "Robotics", "Segmentation"],
        publication: "IEEE 3rd International Conference on Control, Automation and Robotics (ICCAR)",
        pdfUrl: "papers/door-recognition.pdf",
        slidesUrl: "presentations/door-recognition.pdf",
        videoUrls: ["https://youtu.be/d9ijieCgzjA"],
        codeUrl: "https://github.com/Allopart/door_detection_smr"
    },
];

export const work: Experience[] = [
    {
        id: "mederi-ai",
        company: "MederiAI",
        role: "CEO & Co-Founder",
        startDate: "2024",
        endDate: "Present",
        description: "Vision AI models for gastrointestinal lesions in Video Capsule Endoscopy",
        longDescription: "Leading an early stage startup to develop vision AI models that analyses video-capsule endoscopy footage to detect gastrointestinal anomalies rapidly and with high accuracy. Its platform reduces review time from roughly two hours to about fifteen minutes while significantly lowering missed-lesion rates and associated diagnostic delays. The company’s spatio-temporal AI model provides hospitals and clinics with faster, safer, and more efficient small-bowel diagnostics. Raised 300k€ in pre-seed funding to date.",
        tags: ["AI", "AWS", "CNN", "CV", "Docker", "Leadership", "MedTech", "ML", "MLOps", "Transformer"],
        location: "Copenhagen, Denmark",
        websiteUrl: "https://mederiai.com",
        logoUrl: "logos/MederiAI.png",
        videoUrls: ["https://youtu.be/MroXxuon9N8"]
    },
    {
        id: "jabra-gn",
        company: "Jabra (GN Audio)",
        role: "Senior Machine Learning Engineer",
        startDate: "2024",
        endDate: "Present",
        description: "Leading AI initiatives for multimodal systems in video cameras.",
        longDescription: "TODO",
        relatedProjectIds: ["ast-doa"],
        tags: ["AI", "Azure", "CNN", "Docker", "Edge", "Gstreamer", "Leadership", "ML", "MLOps", "Multimodal", "Python", "Segmentation", "Transformer"],
        location: "Copenhagen, Denmark",
        logoUrl: "logos/Jabra.webp"
    },
    {
        id: "veo",
        company: "Veo Technologies",
        role: "Senior Machine Learning Engineer",
        startDate: "2021",
        endDate: "2024",
        description: "Video-based sports analytics using deep learning",
        longDescription: `Development of production-ready deep learning models to be run on cloud and edge devices. This includes data collection, annotation and processing; model definition, training, optimization, profiling, testing and developing the infrastructure for inference using AWS and Gstreamer.
        
Some of the projects I spearheaded were:
        
- Action recognition and localization
- 2D/3D Player and ball detection and tracking, from monocular images
- Advanced match analytics using AI`,
        tags: ["AI", "AWS", "CNN", "Docker", "Edge", "Gstreamer", "Leadership", "ML", "MLOps", "Multimodal", "Pose Estimation", "Python", "SportTech", "Transformer"],
        location: "Copenhagen, Denmark",
        logoUrl: "logos/VEO.png",
        videoUrls: ["https://www.youtube.com/watch?v=F6o9F01GAqY&list=PLksR6ZWZCOOONcj5X8E-HcgyGoogPDm7H&t=1030s"]
    },
    {
        id: "huawei",
        company: "Huawei",
        role: "Senior AI Developer",
        startDate: "2019",
        endDate: "2021",
        description: "Researcher and development of SOTA Deep Learning multimodal models",
        longDescription: "Re-implementation and improvement of state-of-the-art methods for Deep Learning in Computer Vision tasks. These include Object recognition, detection and segmentation (one and two stage),  Human Action recognition and detection, 3D Human Keypoint Estimation, SuperResolution and the supervision of interns",
        tags: ["AI", "AWS", "CNN", "Docker", "GAN", "ML", "Multimodal", "Pose Estimation", "Python", "SR", "Segmentation", "Transformer"],
        relatedPaperIds: ["liftformer"],
        location: "London, United Kingdom",
        logoUrl: "logos/Huawei.jpg"
    },
    {
        id: "dtu-researcher",
        company: "Technical University of Denmark",
        role: "Research Assistant",
        startDate: "2015",
        endDate: "2015",
        description: "Assitance on PhD project: Automation of Combine Harvester, between DTU and AGCO.",
        longDescription: "Developing algorithms and systems for the automation of combine harvesters. Included topics like sensor fusion, UAV vision, image processing and control theory",
        tags: ["CV", "Research", "Robotics", "Sensor fusion", "UAV"],
        location: "Lyngby, Denmark",
        logoUrl: "logos/DTU.png"
    }
];

export const education: Education[] = [

    {
        id: "kaist-visit",
        institution: "KAIST",
        degree: "Visiting PhD Researcher",
        startDate: "2018",
        endDate: "2019",
        description: "Embodied AI for Humanoid Service Robots",
        longDescription: "External Research stay focusing on Humanoid Service Robots at the Robot Intelligence and Technology (RIT) Lab under Professor Jong-Hwan Kim supervision. Worked on deep learning techniques for improving 3D perception and object recognition/manipulation for humanoid robots.",
        tags: ["AI", "C++", "CNN", "CV", "Humanoid", "ML", "Manipulation", "PCL", "Pose Estimation", "Python", "ROS", "Robotics", "SLAM", "YOLO"],
        relatedPaperIds: ["perception-ai", "3d-model-objects", "task-intelligence"],
        logoUrl: "logos/KAIST.png",
        location: "Daejeon, South Korea",
    },
    {
        id: "dtu-phd",
        institution: "Technical University of Denmark",
        degree: "PhD in Humanoid Robotics and Artificial Intelligence",
        startDate: "2016",
        endDate: "2020",
        description: "Autonomous Manipulation and 3D Perception for Humanoid Robots.",
        longDescription: "Focused on enabling robots to handle kitchen chores and interact with unknown objects. Published research in conferences like RiTA.",
        tags: ["AI", "C++", "CNN", "CV", "Humanoid", "ML", "Manipulation", "PCL", "Pose Estimation", "Python", "ROS", "Robotics", "SLAM", "YOLO"],
        relatedPaperIds: ["door-recognition", "bayes", "teleoperated-arm", "semantic-mapping", "maritime"],
        relatedProjectIds: ["rbpf", "table-cleaner"],
        logoUrl: "logos/DTU.png",
        location: "Lyngby, Denmark",
    },
    {
        id: "tokyo-visit",
        institution: "Tokyo University",
        degree: "Master Thesis Research Visit",
        description: "Teleoperation of miniaturized humanoid robots",
        startDate: "2015",
        endDate: "2015",
        longDescription: `Exchange abroad to write the Master Thesis for a duration of 4 months at the Department of Computer Science in Tokyo University under *Professor Takeo Igarashi* and *Associate Professor Daisuke Sakamoto*. The project consisted on developing a **teleoperation system for miniaturized humanoid robots** using VR devices, pose estimation and handheld controllers.`,
        tags: ["Humanoid", "Pose Estimation", "Research", "Robotics", "Teleoperation", "VR"],
        logoUrl: "logos/TU.png",
        pdfUrl: "papers/master-thesis.pdf",
        location: "Tokyo, Japan"
    },
    {
        id: "dtu-master",
        institution: "Technical University of Denmark",
        degree: "MSc in Automation and Robotics",
        startDate: "2013",
        endDate: "2015",
        description: "Grade: 10",
        longDescription: "Double degree programme between Universitat Politecnica de Catalunya and Technical University of Denmark",
        tags: ["Automation", "CS", "Control", "MSc", "Robotics", "Signal Processing"],
        logoUrl: "logos/DTU.png",
        location: "Lyngby, Denmark"
    },
    {
        id: "lisbon-exchange",
        institution: "New University of Lisbon",
        degree: "BEST Course",
        startDate: "2014",
        endDate: "2014",
        description: "Biomedical Signal Processing",
        longDescription: "Learning the basics of biomedical signals and their processing, based on low cost platforms (Arduino).",
        tags: ["Biomedical", "CS", "Control", "Physics", "Signal Processing"],
        websiteUrl: "https://www.best.eu.org/event/details.jsp?activity=afdp70b",
        logoUrl: "logos/UNL.svg",
        location: "Lisbon, Portugal"
    },
    {
        id: "timisora-exchange",
        institution: "Polytechnic University Timisoara",
        degree: "BEST Course",
        startDate: "2013",
        endDate: "2013",
        description: "Robotics control with C# and .NET ",
        longDescription: "Stay abroad Course to learn the basics of C# and .NET and to create interfaces to control robots. Basic Understanding of threading and decision making in robots.",
        tags: [".NET", "C#", "CS", "Robotics"],
        websiteUrl: "https://www.best.eu.org/event/details.jsp?activity=afdp71v",
        logoUrl: "logos/PUT.png",
        location: "Timisoara, Romania"
    },
    {
        id: "upc-bachelor",
        institution: "Polytechnic University Catalunya",
        degree: "BSc in Industrial Engineering",
        startDate: "2009",
        endDate: "2013",
        description: "",
        longDescription: "Double degree programme between Polytechnic University Catalunya and Technical University of Denmark.",
        tags: ["Automation", "CS", "Control", "Physics", "Robotics", "Signal Processing", "Telecom"],
        logoUrl: "logos/UPC.png",
        location: "Barcelona, Spain"
    }
];

export const bio = "Senior AI Engineer | Founder | PhD | AI & Humanoid Robotics";
