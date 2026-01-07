# Software Design Document (SDD)
## The WareHouse13 Art Gallery

### 1. System Architecture

The WareHouse13 Art Gallery is progressively built as a PWA, moving towards a decentralized application (dApp) architecture.

#### 1.1 High-Level Architecture
*   **Frontend (Client):** React.js Single Page Application (SPA) served via Vite. Handles UI, Routing, and VR/AR rendering.
*   **Backend (API Layer - Planned):** Node.js / Express server to handle off-chain data (user profiles, non-critical metadata).
*   **Blockchain Layer:** Ethereum-compatible network (likely Polygon for lower fees) to handle NFT Smart Contracts (ERC-721/ERC-1155).
*   **Storage Layer:** IPFS (InterPlanetary File System) for decentralized storage of Artwork images and NFT Metadata.

### 2. Frontend Design

#### 2.1 Technology Stack
*   **Framework:** React 18+
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Styling:** CSS Modules / Fluent Design System (Custom Implementation)
*   **Icons:** Lucide React
*   **3D/VR:** Three.js / React-Three-Fiber (Future Integration)

#### 2.2 Component Hierarchy
*   **App Root:** `App.tsx` - Main layout and routing container.
*   **Core Components:**
    *   `Hero`: Landing interface.
    *   `Gallery`: Grid view of NFT assets.
    *   `Upload`: User interface for file selection and preview.
    *   `WalletConnect`: specialized button/modal for wallet interactions.
    *   `VRViewer`: Container for the 3D canvas.

#### 2.3 State Management
*   **Local State:** `useState` for simple component UI states.
*   **Global State:** React Context API for:
    *   `UserContext`: Authentication status, Wallet address, User profile.
    *   `GalleryContext`: Loaded assets, filter settings.

### 3. Data Design

#### 3.1 NFT Metadata Standard (ERC-721 Compliant)
```json
{
  "name": "Artwork Title",
  "description": "Description of the artwork",
  "image": "ipfs://<hash_of_image>",
  "attributes": [
    {
      "trait_type": "Artist",
      "value": "Artist Name"
    },
    {
      "trait_type": "Year",
      "value": "2024"
    }
  ]
}
```

#### 3.2 User Profile Schema (Off-chain DB)
*   `walletAddress` (Primary Key)
*   `username`
*   `bio`
*   `avatarUrl`
*   `socialLinks` (Twitter, Instagram)

### 4. Integration Strategy

#### 4.1 Wallet Integration
*   Use libraries like **RainbowKit** or **Web3Modal** to support multiple wallets (MetaMask, One Key, etc.).
*   **Authentication Flow:**
    1.  User clicks "Connect Wallet".
    2.  App requests permission via injected provider (window.ethereum).
    3.  User approves connection.
    4.  App reads address and queries blockchain/backend for profile.

#### 4.2 VR/AR Integration
*   **WebXR API:** Utilize WebXR for immersive VR sessions on supported devices (Oculus, Mobile VR).
*   **React-Three-Fiber:** Declarative 3D scene building within the React component tree.
*   **Optimization:** Use `GLTF` compressed models and texture atlasing to ensure smooth frame rates in the browser.

### 5. Deployment Pipeline
*   **Frontend:** Automated builds via Vercel/Netlify on git push to `main` brand.
*   **Smart Contracts:** Hardhat/Foundry for testing and deployment scripts to Testnets (Sepolia) before Mainnet.
