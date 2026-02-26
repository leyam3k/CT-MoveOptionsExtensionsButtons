# CT-MoveOptionsExtensionsButtons

A SillyTavern/CozyTavern extension that integrates the core Options and Extensions menu buttons into the CT-Sidebar for a cleaner, more streamlined interface.

## Features

- **Seamless Integration**: Automatically moves the Options and Extensions buttons from the input bar to the CT-Sidebar
- **Smart Positioning**: Popout menus dynamically adjust their position based on sidebar location (left or right)
- **Visibility Sync**: Button visibility states are preserved and synchronized with the original buttons
- **Mobile Responsive**: Optimized popout positioning for mobile and portrait orientations
- **Zero Configuration**: Works out of the box with no setup required

## Installation and Usage

### Prerequisites

- SillyTavern (latest version recommended)
- **CT-Sidebar extension** (required dependency)

### Installation

1. Open SillyTavern
2. Navigate to **Extensions** > **Install Extension**
3. Enter the extension URL: `https://github.com/leyam3k/CT-MoveOptionsExtensionsButtons`
4. Click **Install**

Alternatively, you can manually install by cloning this repository into your SillyTavern extensions directory:
```
/public/scripts/extensions/third-party/CT-MoveOptionsExtensionsButtons
```

### Usage

Once installed, the extension automatically:
- Moves the **Options** button (hamburger menu) to the CT-Sidebar
- Moves the **Extensions** button to the CT-Sidebar
- Positions popout menus correctly based on sidebar placement

No additional configuration is needed. The buttons will appear in the CT-Sidebar with order values 90 and 91 respectively.

## How It Works

The extension uses the CT-Sidebar API to register proxy buttons that contain the original SillyTavern buttons. It:
- Monitors the DOM for the original buttons
- Relocates them into CT-Sidebar button containers
- Syncs visibility, title, and click behavior
- Adjusts popout menu positioning dynamically based on sidebar location

## License

MIT