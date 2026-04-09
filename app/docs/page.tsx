export default function DocsPage() {
  return (
    <main>
      <section className="docs-hero">
        <p className="overline">Documentation</p>
        <h1>User Guide</h1>
        <p className="subtitle">
          Everything you need to know about Synvala.
          Also available in-app via the Help button.
        </p>
      </section>

      <div className="docs-layout">
        <nav className="docs-sidebar">
          <h4>Contents</h4>
          <ul>
            {sections.map((s, i) => (
              <li key={i}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="docs-content">
          {/* 1. Getting Started */}
          <section id="getting-started" className="docs-section">
            <h2>Getting Started</h2>

            <h3>Installation</h3>
            <ol>
              <li>Download <code>Synvala_portable.zip</code> from the <a href="/download">download page</a></li>
              <li>
                Extract the zip. You should see:
                <pre>{`Synvala_portable/
├── synvala.exe       ← main app
├── resources/        ← resource files
└── web-dist/         ← frontend UI`}</pre>
              </li>
              <li>Double-click <code>synvala.exe</code> to launch</li>
            </ol>
            <div className="docs-note">
              <strong>Windows security:</strong> If you see a security warning, right-click <code>synvala.exe</code> &rarr; Properties &rarr; check "Unblock" &rarr; OK.
            </div>

            <h3>System Requirements</h3>
            <ul>
              <li>Windows 10/11</li>
              <li>WebView2 Runtime (pre-installed on Windows 10/11)</li>
              <li>No other dependencies required</li>
            </ul>

            <h3>Data Storage</h3>
            <p>
              All data is stored locally at <code>%APPDATA%\com.eln.app\</code>:
            </p>
            <ul>
              <li><code>eln.db</code> — experiments &amp; chemical database (SQLite)</li>
              <li><code>notes/</code> — notebook files (.md, Obsidian-compatible)</li>
            </ul>
            <div className="docs-note">
              We recommend backing up this folder regularly.
            </div>
          </section>

          {/* 2. Interface Overview */}
          <section id="interface" className="docs-section">
            <h2>Interface Overview</h2>

            <h3>Sidebar</h3>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Button</th><th>Function</th></tr></thead>
                <tbody>
                  <tr><td>Experiment List</td><td>View all experiments</td></tr>
                  <tr><td>+ New Experiment</td><td>Create new experiment (choose type)</td></tr>
                  <tr><td>Import JSON</td><td>Import experiments from JSON</td></tr>
                  <tr><td>Chemical Database</td><td>Manage compounds</td></tr>
                  <tr><td>Notebook</td><td>Markdown notes</td></tr>
                  <tr><td>AI Assistant</td><td>AI chat panel</td></tr>
                  <tr><td>To-Do List</td><td>Task management</td></tr>
                  <tr><td>Trash</td><td>Deleted experiments (restorable)</td></tr>
                  <tr><td>Settings</td><td>Themes &amp; language settings</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Themes &amp; Languages</h3>
            <p>
              <strong>Themes:</strong> Dark, Beige, Light, Forest, Ocean<br />
              <strong>Languages:</strong> 繁體中文, English, 日本語, Deutsch, Fran&ccedil;ais
            </p>
          </section>

          {/* 3. Synthesis */}
          <section id="synthesis" className="docs-section">
            <h2>General Synthesis</h2>

            <h3>Creating an Experiment</h3>
            <ol>
              <li>Click <strong>+ New Experiment</strong></li>
              <li>Select <strong>General Synthesis</strong></li>
              <li>An experiment code (e.g. EXP-001) is auto-generated</li>
            </ol>

            <h3>Reaction Setup Tab</h3>
            <p>Each column represents a compound (reactant, catalyst, ligand, base, solvent, additive, product).</p>
            <p><strong>Adding compounds:</strong></p>
            <ul>
              <li><strong>PubChem search</strong> — type a name, pick from results with structure thumbnails</li>
              <li><strong>Draw structure</strong> — open Ketcher editor, auto-queries PubChem after drawing</li>
              <li><strong>Database</strong> — pick from saved compounds</li>
              <li><strong>Edit</strong> — manually set name, MW, density, etc.</li>
            </ul>

            <p><strong>Equivalent calculation:</strong></p>
            <ul>
              <li>Set one reactant as <strong>Reference</strong></li>
              <li>Enter the reference amount (mol or mass)</li>
              <li>All other reagent masses and volumes auto-calculate</li>
            </ul>

            <h3>Procedure Tab</h3>
            <p>Record step-by-step operations with description, time, temperature, and observations.</p>

            <h3>Results Tab</h3>
            <ul>
              <li>Crude / isolated yield</li>
              <li>GC-FID yield estimation (internal standard)</li>
              <li>Selectivity (ee%, dr, er)</li>
              <li>Visual TLC plate recording</li>
            </ul>

            <h3>Spectra Tab</h3>
            <ul>
              <li>NMR (<sup>1</sup>H, <sup>13</sup>C, <sup>19</sup>F, <sup>31</sup>P), IR, MS, HRMS, UV</li>
              <li>Import from MNova</li>
              <li>Interactive JCAMP viewer</li>
            </ul>
          </section>

          {/* 4. Screening */}
          <section id="screening" className="docs-section">
            <h2>Methodology Screening</h2>
            <p>For multi-condition optimization (catalyst, ligand, solvent, temperature screening).</p>

            <h3>Workflow</h3>
            <ol>
              <li><strong>Shared Setup tab</strong> — set common reactants and products</li>
              <li><strong>Condition Screening tab</strong> — add preset columns (Catalyst, Ligand, Base, Solvent, Temp, Time) or custom columns. Each row = one set of conditions.</li>
              <li><strong>Expand arrow</strong> — view reaction scheme + reagent amounts for that row</li>
              <li><strong>Detail edit</strong> — click row number for full editing (procedure, results, spectra)</li>
            </ol>

            <h3>Key Features</h3>
            <ul>
              <li>CSV import/export</li>
              <li>Multi-row condition comparison</li>
              <li>Best condition marking</li>
              <li>Transposed view mode</li>
            </ul>
          </section>

          {/* 5. Multistep */}
          <section id="multistep" className="docs-section">
            <h2>Multistep Synthesis</h2>
            <p>For planning and recording multi-step synthetic routes.</p>
            <ul>
              <li>Starts with Step 1; click <strong>+ Step</strong> to add more</li>
              <li>Products from one step automatically carry over as reactants to the next</li>
              <li>Each step has its own reaction setup, procedure, results, and spectra</li>
              <li>PDF export generates a separate page per step</li>
            </ul>
          </section>

          {/* 6. Substrate Scope */}
          <section id="substrate-scope" className="docs-section">
            <h2>Substrate Scope</h2>
            <p>For substrate scope exploration with publication-ready SI text output.</p>

            <h3>Reaction Conditions Tab</h3>
            <ul>
              <li><strong>Shared reactants</strong> — set equivalents (auto-applied to new rows)</li>
              <li><strong>Shared reagents</strong> — catalyst, ligand, base, solvent</li>
              <li><strong>Conditions</strong> — temperature, time, atmosphere</li>
            </ul>

            <h3>Substrate Overview Tab</h3>
            <ul>
              <li>Add substrates with SI compound numbers (3a, 3b, ...)</li>
              <li>Record yield, ee%, and characterization progress per entry</li>
              <li>Drag to reorder rows for SI output</li>
              <li>Expand arrow to view reaction scheme + amounts</li>
            </ul>

            <h3>Characterization Editor</h3>
            <p>Click the edit button to enter detailed characterization:</p>
            <ul>
              <li><strong>Physical properties</strong> — appearance, mp, optical rotation, Rf</li>
              <li><strong>NMR</strong> — <sup>1</sup>H, <sup>13</sup>C, <sup>19</sup>F, <sup>31</sup>P with frequency &amp; solvent</li>
              <li><strong>IR</strong> — method selection (neat/KBr/film/ATR) + peaks</li>
              <li><strong>HRMS</strong> — ionization, ion type, auto-calculated formula, calcd/found</li>
              <li><strong>Selectivity</strong> — ee%, dr, er with chiral HPLC details (column, eluent, flow rate, wavelength, retention times)</li>
            </ul>

            <h3>SI Export</h3>
            <p>Three export formats:</p>
            <ul>
              <li><strong>Copy</strong> — plain text to clipboard</li>
              <li><strong>.txt</strong> — text file with Unicode sub/superscripts</li>
              <li><strong>.docx</strong> — Word file with proper formatting (superscript, subscript, italic, bold; Times New Roman 12pt, justified)</li>
            </ul>
          </section>

          {/* 7. Chemical Database */}
          <section id="database" className="docs-section">
            <h2>Chemical Database</h2>

            <h3>General Reagents</h3>
            <ul>
              <li>Filter by tag (reactant, catalyst, solvent, product, ligand, base, additive)</li>
              <li>Search, add, edit, delete compounds</li>
              <li>PubChem auto-fill on add; structure drawing auto-parses formula &amp; MW</li>
            </ul>

            <h3>Scope Compounds</h3>
            <ul>
              <li>Grouped by project with thumbnail previews</li>
              <li>Filter by reactant/product + custom tags</li>
              <li>Global tag management (add, rename, delete)</li>
              <li>Structures drawn in substrate scope experiments are auto-collected here</li>
            </ul>
          </section>

          {/* 8. Notebook */}
          <section id="notebook" className="docs-section">
            <h2>Notebook</h2>
            <p>Obsidian-compatible Markdown notes with live preview editing.</p>

            <h3>Templates</h3>
            <ul>
              <li>Blank note</li>
              <li>Reaction planning (condition comparison table)</li>
              <li>Literature reading (paper info template)</li>
              <li>Meeting notes (agenda + action items)</li>
              <li>Weekly report</li>
              <li>Compound note</li>
            </ul>

            <h3>Special Syntax</h3>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Syntax</th><th>Function</th></tr></thead>
                <tbody>
                  <tr><td><code>[[EXP-015]]</code></td><td>Link to experiment (clickable)</td></tr>
                  <tr><td><code>[[Note Title]]</code></td><td>Link to another note</td></tr>
                  <tr><td><code>![[EXP-015]]</code></td><td>Embed experiment data card</td></tr>
                  <tr><td><code>#tag</code></td><td>Tags (auto-highlighted)</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Features</h3>
            <ul>
              <li>Pin notes, table of contents, backlinks</li>
              <li>Print / export PDF</li>
              <li>Daily journal (auto-creates today&apos;s note)</li>
              <li>Open notes folder in Obsidian</li>
              <li>Paste images (Ctrl+V, auto base64 embed)</li>
              <li>Quick switcher (Ctrl+P) for notes &amp; experiments</li>
            </ul>
          </section>

          {/* 9. AI Assistant */}
          <section id="ai" className="docs-section">
            <h2>AI Assistant</h2>
            <p>Built-in AI chat panel with voice input support.</p>

            <h3>Supported Providers</h3>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Provider</th><th>Cost</th><th>Requirement</th></tr></thead>
                <tbody>
                  <tr><td>Claude Code</td><td>Claude subscription</td><td>Claude CLI installed</td></tr>
                  <tr><td>Ollama</td><td>Free</td><td>Ollama installed + model downloaded</td></tr>
                  <tr><td>Google AI Studio</td><td>Free tier</td><td>Google API Key</td></tr>
                  <tr><td>OpenAI Compatible</td><td>Varies</td><td>Endpoint URL + API Key</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Features</h3>
            <ul>
              <li>Voice input (Chinese and English)</li>
              <li>Save conversations or individual responses as notebook entries</li>
              <li>Model selection (Sonnet 4.6, Opus 4.6, Haiku 4.5 for Claude)</li>
            </ul>
          </section>

          {/* 10. PDF & SI Export */}
          <section id="export" className="docs-section">
            <h2>PDF &amp; SI Export</h2>

            <h3>PDF Export</h3>
            <p>Every experiment type supports PDF export with customizable fields:</p>
            <ul>
              <li>Reaction scheme &amp; structure images</li>
              <li>Compound names, formula, mol, mass, volume</li>
              <li>Conditions, procedure, results, selectivity, TLC</li>
              <li>Spectra data</li>
            </ul>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Type</th><th>PDF Content</th></tr></thead>
                <tbody>
                  <tr><td>Synthesis</td><td>Scheme + reagent table + conditions + procedure + results + spectra</td></tr>
                  <tr><td>Screening</td><td>Shared scheme + screening table (landscape)</td></tr>
                  <tr><td>Multistep</td><td>One page per step</td></tr>
                  <tr><td>Substrate Scope</td><td>Shared scheme + reagent table + conditions + substrate table</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Mobile Access</h3>
            <p>
              Devices on the same network can access experiments via browser.
              Check Settings for the access URL.
            </p>
          </section>

          {/* 11. Troubleshooting */}
          <section id="troubleshooting" className="docs-section">
            <h2>Troubleshooting</h2>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Problem</th><th>Solution</th></tr></thead>
                <tbody>
                  <tr><td>White screen on launch</td><td>Install WebView2 Runtime</td></tr>
                  <tr><td>Security warning</td><td>Right-click &rarr; Properties &rarr; Unblock</td></tr>
                  <tr><td>PubChem search not working</td><td>Check internet connection</td></tr>
                  <tr><td>MNova import fails</td><td>Verify MNova is installed and path is correct</td></tr>
                  <tr><td>AI assistant no response</td><td>Check Claude CLI / Ollama is running</td></tr>
                  <tr><td>Updating</td><td>Replace <code>synvala.exe</code> and <code>web-dist/</code>; data is preserved</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Keyboard Shortcuts</h3>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Shortcut</th><th>Function</th></tr></thead>
                <tbody>
                  <tr><td>Ctrl+P</td><td>Quick switcher (in Notebook)</td></tr>
                  <tr><td>Enter</td><td>Send AI message</td></tr>
                  <tr><td>Shift+Enter</td><td>New line in AI input</td></tr>
                  <tr><td>Esc</td><td>Close quick switcher</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const sections = [
  { id: "getting-started", title: "Getting Started" },
  { id: "interface", title: "Interface Overview" },
  { id: "synthesis", title: "General Synthesis" },
  { id: "screening", title: "Methodology Screening" },
  { id: "multistep", title: "Multistep Synthesis" },
  { id: "substrate-scope", title: "Substrate Scope" },
  { id: "database", title: "Chemical Database" },
  { id: "notebook", title: "Notebook" },
  { id: "ai", title: "AI Assistant" },
  { id: "export", title: "PDF & SI Export" },
  { id: "troubleshooting", title: "Troubleshooting" },
];
