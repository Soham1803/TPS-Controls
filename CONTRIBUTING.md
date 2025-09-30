# 🤝 Contributing to Third-Person Controls

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**: 
   ```bash
   git clone https://github.com/YOUR_USERNAME/third-person-shooter-controls
   cd third-person-shooter-controls
   ```
3. **Install dependencies**: 
   ```bash
   pnpm install
   ```
4. **Start development**: 
   ```bash
   pnpm run dev:watch    # Recommended: Auto-rebuilds package + starts demo
   # or
   pnpm run dev          # Just starts demo app
   ```

## 🏗️ Project Structure

- `package/` - NPM package source code
- `demo/` - Live demo application  
- `docs/` - Documentation
- `examples/` - Usage examples

### Package Manager

This project uses **pnpm** as the preferred package manager due to its efficiency with monorepos and workspace management. While npm and yarn will work, we recommend using pnpm for consistency with the development environment.

## 🧪 Development Workflow

1. **Create a feature branch**: `git checkout -b feature/amazing-feature`
2. **Make changes** in `package/src/`
3. **Test in real-time**: `pnpm run dev:watch` (automatically rebuilds package when you edit source files)
4. **Build package**: `pnpm run build` (for final testing)
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Create Pull Request**

## 🎯 Areas for Contribution

### 🔧 **Core Features**
- Movement mechanics improvements
- Shooting system enhancements  
- Camera collision detection
- Physics integration

### 🎨 **Visual Effects**
- Muzzle flash improvements
- Bullet trails
- Hit spark effects
- Particle systems

### 🎮 **Input Systems**
- Gamepad/controller support
- Mobile touch controls
- Input customization

### 📚 **Documentation**
- API documentation
- Usage examples
- Tutorials and guides
- Code comments

### 🧪 **Testing**
- Unit tests
- Integration tests
- Browser compatibility
- Performance testing

## 📝 Pull Request Guidelines

- **Clear Description**: Explain what your PR does and why
- **Small Changes**: Keep PRs focused and atomic
- **Test Your Changes**: Ensure everything works in the demo
- **Update Documentation**: Add docs for new features
- **Follow Code Style**: Use existing patterns and conventions

## 🔍 Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use meaningful variable names

## 🏃 Running the Project

### Development
```bash
pnpm run dev:watch  # 🚀 Recommended: Auto-rebuilds package + starts demo
pnpm run dev        # Just starts demo app (requires manual rebuilds)
```

### Building
```bash
pnpm run build      # Build package
pnpm run build:demo # Build demo
```

### Testing
```bash
pnpm run lint       # Lint code
pnpm test           # Run tests (when available)
```

### 💡 Pro Tip
Use `pnpm run dev:watch` for the best development experience! It automatically:
- Watches for changes in `package/src/`
- Rebuilds the package when files change
- Hot reloads the demo application
- Shows both package and demo logs in one terminal

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

## ✨ Feature Requests

For new features, please describe:
- The problem it solves
- Proposed solution
- Alternative approaches considered
- Examples of usage

## 📜 Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Focus on what's best for the community

## 🎉 Recognition

Contributors will be:
- Added to the README contributors list
- Mentioned in release notes
- Given credit in documentation

## 📬 Questions?

- Open a GitHub issue for technical questions
- Start a discussion for general questions
- Check existing issues before creating new ones

---

**Thank you for contributing!** Every contribution, no matter how small, helps make this project better. 🚀
