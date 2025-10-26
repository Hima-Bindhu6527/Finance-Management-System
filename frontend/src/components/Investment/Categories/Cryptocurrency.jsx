import React, { useState } from "react";
import "./Cryptocurrency.css";

const Cryptocurrency = () => {
  const [activeTab, setActiveTab] = useState("basics");

  const cryptoTypes = [
    {
      name: "Bitcoin",
      description:
        "The first cryptocurrency ever introduced, considered 'digital gold'",
      details:
        "Market capitalization of $172.76 billion, the largest of any cryptocurrency. A unit of Bitcoin can be broken down into Satoshis (like rupees and paise).",
      keyPoint:
        "The Bitcoin network is designed to only have 21 million units in circulation at any time. This limited availability drives its market price.",
      features: [
        "First mover advantage",
        "Digital gold status",
        "Limited to 21M units",
        "Divisible into Satoshis",
      ],
    },
    {
      name: "Altcoins",
      description:
        "Alternative cryptocurrencies - forks and variations of Bitcoin",
      details:
        "This category primarily involves forks and alternate versions of Bitcoin. However, some Altcoins are exponentially different from Bitcoin and use varying algorithms.",
      keyPoint:
        "Ethereum, an altcoin, is not just a currency but a platform where entities can make their apps based on blockchain.",
      features: [
        "Ethereum - smart contracts",
        "Factom - data management",
        "Litecoin - faster transactions",
        "NEO - Chinese platform",
        "Over 1000+ altcoins exist",
      ],
    },
    {
      name: "Tokens",
      description: "Products of altcoins like Ethereum and NEO",
      details:
        "These cryptocurrencies do not have a separate blockchain but instead run on decentralized apps (dApps) created via altcoins.",
      keyPoint:
        "Tokens carry lower value compared to Bitcoin and Altcoins because they can only be used to purchase items from specific dApps.",
      features: [
        "Run on existing platforms",
        "Used within dApps",
        "Lower value than Bitcoin/Altcoins",
        "App-specific utility",
      ],
    },
  ];

  const topCryptos = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      marketCap: "$319.59B",
      price: "$0.001161",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      marketCap: "$146.21B",
      price: "$1,220.80",
    },
    { name: "Tether", symbol: "USDT", marketCap: "$66,241B", price: "$1.021" },
    { name: "XRP", symbol: "XRP", marketCap: "$27.937B", price: "$0.3427" },
    {
      name: "Bitcoin Cash",
      symbol: "BCH",
      marketCap: "$1.87B",
      price: "$96.64",
    },
    { name: "Bitcoin SV", symbol: "BSV", marketCap: "$796M", price: "$41.17" },
    { name: "Litecoin", symbol: "LTC", marketCap: "$376.09M", price: "$71.26" },
    {
      name: "Binance Coin",
      symbol: "BNB",
      marketCap: "$39.27B",
      price: "$244.06",
    },
    { name: "EOSA", symbol: "EOS", marketCap: "$928M", price: "$1.37" },
    { name: "Tezos", symbol: "XTZ", marketCap: "$0.73B", price: "$0.72" },
  ];

  const advantages = [
    {
      title: "Protection Against Inflation",
      description:
        "The amount of any coin is specified in the source code. As demand grows, its value rises, keeping pace with the market and preventing inflation in the long term.",
      icon: "�️",
    },
    {
      title: "Privacy & Security",
      description:
        "The blockchain ledger is built on many mathematical problems that are difficult to decode. Cryptocurrency uses pseudonyms unrelated to any user, account, or stored data.",
      icon: "🔒",
    },
    {
      title: "Self-Governed",
      description:
        "Developers/miners hold cryptocurrency transactions on their hardware and receive transaction fees as rewards. They keep transaction records accurate and up to date, preserving cryptocurrency's integrity.",
      icon: "⚖️",
    },
    {
      title: "Decentralization",
      description:
        "No single entity determines the flow and value of the coin. This keeps it stable and secure, unlike fiat currencies controlled by governments.",
      icon: "🌐",
    },
    {
      title: "Easy Transfer",
      description:
        "Cryptocurrency transactions, whether international or domestic, are lightning fast. Verification takes extremely little time to complete with minimal barriers.",
      icon: "⚡",
    },
  ];

  const disadvantages = [
    {
      title: "Limited Fiat Conversion",
      description:
        "Some cryptocurrencies are only available in a single or a few fiat currencies. Users must first convert to major currencies like Bitcoin or Ethereum, adding superfluous transaction fees.",
      icon: "💱",
    },
    {
      title: "Hacking Vulnerability",
      description:
        "Although cryptocurrencies are secure, exchanges are not. Exchanges like Bitfinex and Mt Gox have been hacked, with Bitcoin worth millions stolen. Hackers can access wallet information stored by exchanges.",
      icon: "🚨",
    },
    {
      title: "No Refunds or Cancellations",
      description:
        "If funds are sent to the wrong wallet address by mistake, the sender cannot retrieve the coin. Transactions are irreversible, enabling potential fraud.",
      icon: "❌",
    },
  ];

  const useCases = [
    {
      title: "Mode of Payment",
      icon: "💳",
      examples: [
        "Apple Inc. allows 10 types of cryptocurrencies in the App Store",
        "Restaurants, flights, jewelers worldwide accept Bitcoin",
        "Big companies like Apple and Facebook are hoisting the cause",
        "Expected to gain traction in India soon",
      ],
    },
    {
      title: "Investment Opportunity",
      icon: "📈",
      examples: [
        "One of the most lucrative investment options currently",
        "Supremely dynamic value appreciation",
        "Excellent avenue for capital expansion",
        "Bitcoin has largest market share",
      ],
    },
  ];

  const indianPlatforms = [
    {
      name: "WazirX",
      features: "Indian rupee deposits, P2P trading, Wide variety of coins",
    },
    {
      name: "CoinDCX",
      features:
        "Wide variety of coins, Futures trading, User-friendly interface",
    },
    {
      name: "ZebPay",
      features: "User-friendly, Educational resources, Secure platform",
    },
    {
      name: "CoinSwitch",
      features: "Simple interface, Good for beginners, Multiple coin support",
    },
  ];

  return (
    <div className="crypto-content-wrapper">
      <div className="crypto-header">
        <h1>CRYPTOCURRENCY</h1>
        <p className="crypto-subtitle">
          Build wealth through digital currencies - The future of money powered
          by blockchain technology
        </p>
      </div>

      <div className="crypto-important-notice">
        <strong>⚠️ Important Notice:</strong> Cryptocurrency investments are
        highly risky and speculative. In India, crypto gains are taxed at 30%.
        Always do thorough research and invest only what you can afford to lose.
      </div>

      <div className="crypto-tab-navigation">
        <button
          className={activeTab === "basics" ? "crypto-active" : ""}
          onClick={() => setActiveTab("basics")}
        >
          What is Crypto?
        </button>
        <button
          className={activeTab === "types" ? "crypto-active" : ""}
          onClick={() => setActiveTab("types")}
        >
          Types & Prices
        </button>
        <button
          className={activeTab === "uses" ? "crypto-active" : ""}
          onClick={() => setActiveTab("uses")}
        >
          Uses & Storage
        </button>
        <button
          className={activeTab === "proscons" ? "crypto-active" : ""}
          onClick={() => setActiveTab("proscons")}
        >
          Pros & Cons
        </button>
        <button
          className={activeTab === "platforms" ? "crypto-active" : ""}
          onClick={() => setActiveTab("platforms")}
        >
          Indian Platforms
        </button>
      </div>

      {activeTab === "basics" && (
        <div className="crypto-overview-section">
          <div className="crypto-intro-content">
            <h2>What is Cryptocurrency?</h2>
            <p>
              A cryptocurrency is a <strong>virtual or digital currency</strong>{" "}
              that can be used to buy goods and services; which implies there's
              no physical coin or bill used and all the transactions take place
              online. It uses an online ledger with strong cryptography to
              ensure that online transactions are completely secure.
            </p>
            <p>
              It is a purely virtual line of currency that runs on the system of{" "}
              <strong>cryptography</strong>. It functions as a decentralized
              medium of exchange where cryptography is used to verify and
              facilitate each transaction. Cryptography also underlies the
              creation of units of different cryptocurrencies.
            </p>
          </div>

          <div className="crypto-blockchain-section">
            <h3>🔗 Blockchain Technology</h3>
            <p>
              This mode of exchange primarily runs on{" "}
              <strong>blockchain technology</strong> – that which lends
              cryptocurrencies decentralized status. It is a{" "}
              <strong>shared public ledger</strong> that contains all the
              transactions that have ever taken place within a network.
              Therefore, everyone on the network can see each transaction that
              takes place and also view others' balances.
            </p>
            <p>
              The Blockchain technology addresses one of the primary concerns
              with digital payment platforms, i.e.{" "}
              <strong>double-spending</strong>
              while ensuring there is no monopoly of authority. That is because,
              in blockchain technology, parties to a transaction themselves
              verify and facilitate every such activity.
            </p>
          </div>

          <div className="crypto-history-section">
            <h3>📜 How was the Idea of Cryptocurrency Conceived?</h3>
            <p>
              The concept of digital currency gained considerable traction in
              the <strong>90s tech boom</strong>. Multiple organizations and
              programmers ventured to create a parallel line of currency that
              would be out of any central authority's reach. However,
              ironically, the companies that tried to create this digital
              currency themselves assumed the authority of verifying and
              facilitating transactions.
            </p>
            <p>
              It not only defeated the purpose but founded the venture as well.
              Moreover, the digital currencies back then were riddled with
              frauds and other financial challenges. For a long time since then,
              this idea of digital currency was considered a lost cause. This
              idea was falsified when <strong>Satoshi Nakamoto</strong> – a
              programmer or a group of programmers – introduced and explained
              what Bitcoin is in <strong>2009</strong>, the first-ever
              cryptocurrency.
            </p>
          </div>

          <div className="crypto-how-it-works-section">
            <h2>How Does Cryptocurrency Work?</h2>
            <p>
              According to Satoshi Nakamoto, the founding father of Bitcoin, it
              is a <strong>peer-to-peer electronic cash system</strong>. In
              that, it is much similar to peer-to-peer file transactions, where
              there is no involvement of any central authority or regulator.
            </p>
            <p>
              Ergo, cryptocurrencies are mere transactions or entries in a
              shared ledger that can only be changed upon meeting certain
              prerequisites. Typically, in a blockchain technology like the
              Bitcoin network, each transaction consists of the involved
              parties' – sender and receiver –{" "}
              <strong>wallet addresses or public keys</strong> and the amount of
              such transaction.
            </p>

            <div className="crypto-work-steps">
              <div className="crypto-step-item">
                <h4>1. Transaction Confirmation</h4>
                <p>
                  What attributes the safety net in such a network to avoid
                  fraud is that the sender needs to confirm a transaction with
                  their <strong>private key</strong>. After confirmation, the
                  transaction is reflected in the shared ledger or database.
                </p>
              </div>

              <div className="crypto-step-item">
                <h4>2. Miner Verification</h4>
                <p>
                  However, only <strong>miners</strong> are authorized to
                  confirm transactions within a cryptocurrency network. They
                  need to solve cryptographic puzzles to confirm any specific
                  transaction. In exchange for their service, they receive a
                  transaction fee in that particular type of cryptocurrency and
                  a reward.
                </p>
              </div>

              <div className="crypto-step-item">
                <h4>3. Network Update</h4>
                <p>
                  Once miners confirm a transaction, they spread it to the
                  network, and every node in that automatically updates its
                  ledger accordingly. Furthermore, once a miner confirms a
                  particular transaction, it becomes{" "}
                  <strong>irreversible and non-modifiable</strong>.
                </p>
              </div>

              <div className="crypto-step-item">
                <h4>⛏️ The Mining Catch</h4>
                <p>
                  As a particular type of cryptocurrency gains popularity and
                  more and more miners join the bandwagon, the miners' fees and
                  reward per transaction go down. For instance, initially,
                  miners could get <strong>50 bitcoins (BTC)</strong> as a
                  reward for mining; however, due to the recent halving in May
                  2020, miners' rewards have gone down to{" "}
                  <strong>6.25 BTC</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "types" && (
        <div className="crypto-types-section">
          <h2>What are the Different Types of Cryptocurrencies?</h2>
          <p className="section-intro">
            When it comes to the variants of cryptocurrencies, most are forks of
            Bitcoin, while others were built from scratch. However, there are
            only <strong>3 broad types</strong> of cryptocurrencies currently in
            existence:
          </p>

          <div className="crypto-types-grid">
            {cryptoTypes.map((crypto, index) => (
              <div key={index} className="type-card">
                <h3>{crypto.name}</h3>
                <p className="type-description">{crypto.description}</p>
                <p className="type-details">{crypto.details}</p>
                <div className="key-point">
                  <strong>Key Point:</strong> {crypto.keyPoint}
                </div>
                <ul className="features-list">
                  {crypto.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="price-section">
            <h2>💰 What is the Price of Cryptocurrencies?</h2>
            <p className="price-note">
              The following table illustrates the top 10 cryptocurrency list
              currently trading and their market prices as of January 2021:
            </p>
            <div className="price-table">
              <div className="table-header">
                <div>Name</div>
                <div>Symbol</div>
                <div>Market Cap (USD)</div>
                <div>Per Token Value ($)</div>
              </div>
              {topCryptos.map((crypto, index) => (
                <div key={index} className="table-row">
                  <div className="crypto-name">{crypto.name}</div>
                  <div className="crypto-symbol">{crypto.symbol}</div>
                  <div className="crypto-marketcap">{crypto.marketCap}</div>
                  <div className="crypto-price">{crypto.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "uses" && (
        <div className="uses-section">
          <h2>What is the Use of Cryptocurrency?</h2>
          <p className="section-intro">
            It is worth wondering if the popularity that cryptocurrency has
            garnered over the years is hollow or not. However, even though it is
            still nowhere near to replacing institutionalized cash,
            cryptocurrency, especially Bitcoin, has found wide acceptance across
            the world.
          </p>

          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-card">
                <div className="use-icon">{useCase.icon}</div>
                <h3>{useCase.title}</h3>
                <ul>
                  {useCase.examples.map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="volatility-warning">
            <h3>⚠️ Note on Volatility</h3>
            <p>
              However, individuals must also note the volatility of this
              investment avenue. Bitcoin, the most popular cryptocurrency with
              the largest market share, has experienced some of the most erratic
              price changes as an asset. For instance, in
              <strong> December 2017</strong>, Bitcoin's value plunged from{" "}
              <strong>$19,000 per BTC to $7,000 per BTC</strong>.
            </p>
            <p>
              Since cryptocurrency is not rooted in any material change but a
              change in popularity and fad, such price fluctuation is natural.
            </p>
          </div>

          <div className="buying-section">
            <h2>🛒 How to Buy Cryptocurrency?</h2>
            <p>
              Compared to other variants of cryptocurrency, units of Bitcoin can
              be purchased more conveniently owing to a large number of options.
              Individuals can choose to purchase it from:
            </p>
            <div className="buying-options">
              <div className="option-item">✓ Cryptocurrency exchanges</div>
              <div className="option-item">✓ Using gift cards</div>
              <div className="option-item">✓ Via investment trusts</div>
            </div>
          </div>

          <div className="storage-section">
            <h2>🔐 How to Store Cryptocurrency?</h2>
            <p>
              Entities can hold units of cryptocurrencies in{" "}
              <strong>wallets – offline and online</strong>. Each such wallet
              holds a <strong>public key</strong> (i.e. the wallet address) and
              a <strong>private key</strong> (used to sign off payments). In any
              case, it is not exactly the units of cryptocurrency that one holds
              but the private key.
            </p>

            <div className="wallet-types">
              <div className="wallet-card">
                <h4>🌐 Online Wallets</h4>
                <p>
                  Online wallets largely serve the purpose of regular
                  transactions. <strong>Apple</strong>, as well as
                  <strong> J.P. Morgan Chase, Visa, and Facebook</strong>, have
                  introduced online crypto-wallets.
                </p>
              </div>

              <div className="wallet-card">
                <h4>🔒 Offline/Cold Wallets</h4>
                <p>
                  Conversely, offline or cold wallets are stored in a person's
                  hard drive and serve the purpose of security of
                  cryptocurrency.
                </p>
              </div>
            </div>

            <p className="wallet-note">
              Nevertheless, entities can select from a wide range of crypto
              wallets, each catering to a different purpose.
            </p>
          </div>
        </div>
      )}

      {activeTab === "proscons" && (
        <div className="proscons-section">
          <div className="advantages-section">
            <h2>✅ Cryptocurrency Advantages (Merits)</h2>
            <div className="advantages-grid">
              {advantages.map((advantage, index) => (
                <div key={index} className="advantage-card">
                  <div className="advantage-icon">{advantage.icon}</div>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="disadvantages-section">
            <h2>⚠️ Cryptocurrency Disadvantages (Demerits)</h2>
            <div className="disadvantages-grid">
              {disadvantages.map((disadvantage, index) => (
                <div key={index} className="disadvantage-card">
                  <div className="disadvantage-icon">{disadvantage.icon}</div>
                  <h3>{disadvantage.title}</h3>
                  <p>{disadvantage.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="regulatory-info">
            <h3>📜 Regulatory Status in India</h3>
            <p>
              As of 2024, cryptocurrencies are <strong>legal in India</strong>{" "}
              but not recognized as legal tender. The Indian government has
              imposed a <strong>30% tax on crypto gains</strong> with no
              deductions allowed, and <strong>1% TDS</strong> on crypto
              transactions. Regulations are evolving, so stay updated with the
              latest government policies.
            </p>
          </div>
        </div>
      )}

      {activeTab === "platforms" && (
        <div className="platforms-section">
          <h2>🇮🇳 Indian Cryptocurrency Exchanges</h2>
          <p className="section-intro">
            India has several reputable cryptocurrency exchanges that allow you
            to buy, sell, and trade digital currencies with Indian Rupees (INR).
            Here are the top platforms:
          </p>

          <div className="platforms-grid">
            {indianPlatforms.map((platform, index) => (
              <div key={index} className="platform-card">
                <h3>{platform.name}</h3>
                <p>{platform.features}</p>
              </div>
            ))}
          </div>

          <div className="security-tips">
            <h3>🔒 Security Best Practices</h3>
            <ul className="security-list">
              <li>Use strong, unique passwords for each exchange</li>
              <li>Enable 2FA (Two-Factor Authentication)</li>
              <li>Beware of phishing websites and emails</li>
              <li>Don't share your private keys with anyone</li>
              <li>Consider hardware wallets for large amounts</li>
              <li>Keep your software and apps updated</li>
              <li>Use secure internet connections (avoid public WiFi)</li>
              <li>Start with small amounts you can afford to lose</li>
              <li>Never invest based on social media hype</li>
            </ul>
          </div>
        </div>
      )}

      <div className="cta-section">
        <h3>Ready to start your cryptocurrency journey?</h3>
        <p>Begin investing with India's leading cryptocurrency platform</p>
        <a
          href="https://coindcx.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          Invest Now 🚀
        </a>
      </div>
    </div>
  );
};

export default Cryptocurrency;
