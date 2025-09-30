# 🎮 Third-Person Shooter Controls

A modern, web-based third-person shooter game built with **React Three Fiber**, **TypeScript**, and **Rapier Physics**. Experience smooth gameplay with advanced camera controls, realistic physics, and immersive 3D graphics - all running in your browser!

![Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)

## ✨ Features

- 🎯 **Smooth Third-Person Camera System** with intelligent collision detection
- 🏃 **Realistic Movement Controls** - Walk, run, strafe, jump, and crouch
- 🔫 **Dynamic Shooting System** with muzzle flash effects and recoil
- 🎨 **Advanced Animation System** using FBX animations with smooth transitions
- 🌍 **Physics-Based Gameplay** powered by Rapier physics engine
- 📱 **Responsive Controls** supporting both keyboard and potential gamepad input
- 🏗️ **Modular Architecture** with clean separation of concerns

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and pnpm (recommended) or npm/yarn
- Modern web browser with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Soham1803/third-person-shooter-controls.git
   cd third-person-shooter-controls
   ```

2. **Quick setup** (recommended)
   ```bash
   pnpm run setup
   ```
   
   Or **install dependencies manually**:
   ```bash
   pnpm install
   # or alternatively
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   pnpm run dev:watch    # Recommended: Auto-rebuilds package + demo
   # or alternatively
   pnpm run dev          # Just demo
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Controls

| Key | Action |
|-----|--------|
| `W/A/S/D` | Move forward/left/backward/right |
| `F` (hold) | Run |
| `Space` | Jump |
| `Mouse` | Look around |
| `Right Click` (hold) | Zoom/Aim |
| `Left Click` | Shoot |

## 🏗️ Project Structure

```
├── package/                    # 📦 NPM Package Source
│   ├── src/
│   │   ├── Player.tsx          # Main player component
│   │   ├── index.ts            # Package entry point
│   │   └── modules/player/     # Modular player systems
│   │       ├── constants.ts    # Game configuration
│   │       ├── types.ts        # TypeScript interfaces
│   │       ├── camera.ts       # Camera positioning & collision
│   │       ├── movement.ts     # Player movement logic
│   │       ├── jump.ts         # Jump mechanics
│   │       ├── shooting.ts     # Weapon system
│   │       ├── recoil.ts       # Camera recoil effects
│   │       ├── muzzleFlash.ts  # Visual effects
│   │       ├── physics.ts      # Physics integration
│   │       ├── textures.ts     # Texture utilities
│   │       └── useAnimationSetup.ts # Animation management
│   ├── dist/                   # Built package files
│   ├── package.json            # Package configuration
│   └── README.md               # Package documentation
├── demo/                       # 🎮 Live Demo Application
│   ├── src/
│   │   ├── App.tsx             # Demo app component
│   │   └── CustomPlayerExample.tsx # Usage examples
│   ├── public/
│   │   ├── models/             # 3D models (.glb)
│   │   ├── animations/         # Animation files (.fbx)
│   │   ├── sfx/                # Sound effects
│   │   ├── vfx/                # Visual effect textures
│   │   └── svgs/               # UI assets
│   └── package.json            # Demo app configuration
├── docs/                       # 📚 Documentation
│   ├── getting-started.md      # Quick start guide
│   └── asset-integration.md    # Asset customization guide
├── package.json                # Workspace configuration
├── pnpm-workspace.yaml         # pnpm workspace setup
└── README.md                   # This file
```

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Whether you're fixing bugs, adding features, improving documentation, or sharing ideas, your contributions make this project better.

### Ways to Contribute

- 🐛 **Bug Reports** - Found something broken? Let us know!
- ✨ **Feature Requests** - Have ideas for cool new features?
- 🔧 **Code Contributions** - Fix bugs or implement new features
- 📚 **Documentation** - Help improve our docs
- 🎨 **Assets** - Contribute 3D models, animations, or sound effects
- 🧪 **Testing** - Help test the game on different devices/browsers

### Getting Started

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Test** your changes thoroughly
5. **Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### Development Guidelines

- 📝 **Code Style**: We use ESLint and TypeScript for code quality
- 🧪 **Testing**: Test your changes across different browsers
- 📖 **Documentation**: Update documentation for new features
- 🎯 **Performance**: Keep performance in mind, especially for real-time features
- 🏗️ **Architecture**: Follow the existing modular structure

### Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful, constructive, and helpful in all interactions.

## 🛠️ Built With

- **[React Three Fiber](https://github.com/pmndrs/react-three-fiber)** - React renderer for Three.js
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[Rapier](https://rapier.rs/)** - Fast 2D and 3D physics engine
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[React](https://reactjs.org/)** - UI library

## 🎯 Roadmap

- [ ] 🎮 Gamepad/Controller support
- [ ] 🎵 Enhanced audio system
- [ ] ✨ Enhanced VFX - bullet trails, hit sparks, improved muzzle flash
- [ ] 🔫 Additional weapon compatibility and variety
- [ ] 🏆 Achievement system
- [ ] 📱 Mobile controls
- [ ] 🎨 More character models and animations
- [ ] 🔧 Settings/options menu

## � Troubleshooting

### Common Issues

**Installation Problems:**
```bash
# If you encounter lock file errors
pnpm run reset

# If packages seem outdated
pnpm install --force
```

**Development Issues:**
```bash
# If changes aren't reflected
pnpm run dev:watch

# If build fails
pnpm run build
```

**For more detailed troubleshooting, see [CONTRIBUTING.md](CONTRIBUTING.md#troubleshooting)**

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who help make this project better
- [Three.js community](https://discourse.threejs.org/) for excellent documentation and support
- [React Three Fiber ecosystem](https://github.com/pmndrs) for amazing tools and examples

## 📬 Contact

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community chat

---

**Ready to contribute?** Check out our [issues](../../issues) page for beginner-friendly tasks or propose your own ideas! 🚀
