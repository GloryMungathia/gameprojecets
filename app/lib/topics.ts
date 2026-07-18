export const TOPICS: Record<string, string[]> = {
    "QA": [
        "TESTING", "BUGS", "REGRESSION", "AUTOMATION", "SELENIUM",
        "MANUAL", "SMOKE", "SANITY", "DEFECT", "COVERAGE",
        "SCRIPT", "STAGING", "RELEASE", "CYPRESS", "ASSERTION",
        "MOCK", "STUB", "PIPELINE", "JIRA", "EXPLORATORY"
    ],
    "Product Management": [
        "ROADMAP", "BACKLOG", "SPRINT", "MVP", "STAKEHOLDER",
        "PERSONA", "METRIC", "RETRO", "KANBAN", "SCRUM",
        "EPIC", "RELEASE", "FEATURE", "LAUNCH", "VISION",
        "STRATEGY", "USER", "MARKET", "PIVOT", "FUNNEL"
    ],
    "Frontend Web": [
        "REACT", "CSS", "HTML", "JAVASCRIPT", "DOM",
        "COMPONENT", "STATE", "PROPS", "HOOK", "ROUTER",
        "TAILWIND", "VITE", "WEBPACK", "BROWSER", "RENDER",
        "FETCH", "AJAX", "SASS", "GRID", "FLEXBOX"
    ],
    "Frontend Mobile": [
        "FLUTTER", "SWIFT", "KOTLIN", "XCODE", "ANDROID",
        "WIDGET", "GESTURE", "LAYOUT", "EMULATOR", "NATIVE",
        "EXPO", "PERMISSION", "PUSH", "STORE", "DEPLOY",
        "SIMULATOR", "GRADLE", "COCOAPODS", "APK", "IPA"
    ],
    "Programming Languages": [
        "PYTHON", "JAVA", "RUBY", "GOLANG", "RUST",
        "SWIFT", "KOTLIN", "TYPESCRIPT", "SCALA", "PERL",
        "PHP", "HASKELL", "ELIXIR", "DART", "CLOJURE",
        "SYNTAX", "COMPILER", "RUNTIME", "LOOP", "FUNCTION"
    ],
    "Data Structures": [
        "ARRAY", "STACK", "QUEUE", "HEAP", "GRAPH",
        "TREE", "LINKEDLIST", "HASHMAP", "TRIE", "MATRIX",
        "NODE", "POINTER", "RECURSION", "SORTING", "SEARCH",
        "BINARY", "INDEX", "TRAVERSAL", "COMPLEXITY", "ALGORITHM"
    ],
    "Machine Learning": [
        "MODEL", "DATASET", "NEURAL", "TRAINING", "TENSOR",
        "REGRESSION", "CLASSIFIER", "FEATURE", "LABEL", "ACCURACY",
        "OVERFIT", "GRADIENT", "EPOCH", "CLUSTER", "PYTORCH",
        "KERAS", "INFERENCE", "PIPELINE", "VECTOR", "BIAS"
    ],
    "Internet of Things": [
        "SENSOR", "MQTT", "EMBEDDED", "GATEWAY", "FIRMWARE",
        "ARDUINO", "RASPBERRY", "PROTOCOL", "ACTUATOR", "TELEMETRY",
        "BLUETOOTH", "ZIGBEE", "CLOUD", "EDGE", "MICROCONTROLLER",
        "NETWORK", "DEVICE", "LATENCY", "BANDWIDTH", "MESH"
    ],
    "Cybersecurity": [
        "FIREWALL", "PHISHING", "ENCRYPT", "MALWARE", "BREACH",
        "TOKEN", "AUTHENTICATION", "VULNERABILITY", "PATCH", "EXPLOIT",
        "RANSOMWARE", "PENTEST", "CIPHER", "THREAT", "INTRUSION",
        "SANDBOX", "PROXY", "CERTIFICATE", "AUDIT", "COMPLIANCE"
    ],
    "Product Design": [
        "WIREFRAME", "FIGMA", "PROTOTYPE", "USABILITY", "PERSONA",
        "MOCKUP", "PALETTE", "TYPOGRAPHY", "LAYOUT", "ICONOGRAPHY",
        "ACCESSIBILITY", "INTERACTION", "JOURNEY", "SKETCH", "GRID",
        "CONTRAST", "HIERARCHY", "RESPONSIVE", "BRANDING", "USERFLOW"
    ],
};

export function getRandomTopicWords(count: number = 10) {
    const topicNames = Object.keys(TOPICS);
    const topic = topicNames[Math.floor(Math.random() * topicNames.length)];
    const allWords = TOPICS[topic];

    // Shuffle and pick a subset so repeats are rare
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count).filter((w) => w.length <= 12); // fits 15x15 grid comfortably

    return { topic, words: selected };
}