<?xml version="1.0" encoding="UTF-8"?>
<!--
  ARKUSZ STYLÓW SITEMAPY – Costa Investors
  Obsługuje sitemapindex oraz urlset (z alternatywami językowymi).
  Renderowany w przeglądarce; roboty ignorują XSL i czytają czysty XML.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="pl">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>
          <xsl:choose>
            <xsl:when test="sm:sitemapindex">Costa Investors – XML Sitemap Index</xsl:when>
            <xsl:otherwise>Costa Investors – XML Sitemap</xsl:otherwise>
          </xsl:choose>
        </title>
        <style>
          :root{--brand-950:#071a2f;--brand-900:#0b2545;--brand-800:#123a63;
            --brand-600:#1d69b0;--brand-200:#c1ddf5;--brand-100:#e3f0fb;
            --brand-50:#f2f8fd;--text:#0f2439;--muted:#5a7186;}
          *{box-sizing:border-box}
          body{margin:0;background:var(--brand-50);color:var(--text);
            font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
          header{background:linear-gradient(135deg,var(--brand-950),var(--brand-900) 55%,var(--brand-800));
            color:#fff;padding:32px 20px 28px}
          .wrap{max-width:1180px;margin:0 auto}
          .brand{display:flex;align-items:center;gap:12px}
          .mark{width:40px;height:40px;border-radius:11px;background:rgba(255,255,255,.12);
            border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center}
          .brand-name{display:block;font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
          .brand-sub{display:block;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--brand-200)}
          h1{margin:18px 0 4px;font-size:26px;line-height:1.2}
          .lead{margin:0;color:var(--brand-200);font-size:13px}
          .stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .stat{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);
            border-radius:12px;padding:10px 14px;min-width:132px}
          .stat b{display:block;font-size:20px;line-height:1.2}
          .stat span{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--brand-200)}
          main{padding:26px 20px 40px}
          .card{background:#fff;border:1px solid var(--brand-100);border-radius:16px;overflow:hidden;
            box-shadow:0 12px 32px -24px rgba(7,26,47,.35)}
          table{width:100%;border-collapse:collapse;font-size:13.5px}
          thead th{background:var(--brand-50);color:var(--brand-800);text-align:left;font-size:10.5px;
            letter-spacing:.12em;text-transform:uppercase;padding:12px 14px;
            border-bottom:1px solid var(--brand-100);white-space:nowrap}
          tbody td{padding:11px 14px;border-bottom:1px solid var(--brand-50);vertical-align:top}
          tbody tr:nth-child(even){background:#fafcff}
          tbody tr:hover{background:var(--brand-50)}
          .idx{color:var(--muted);font-variant-numeric:tabular-nums;width:64px}
          a{color:var(--brand-600);text-decoration:none;word-break:break-all}
          a:hover{color:var(--brand-900);text-decoration:underline}
          code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px}
          .tag{display:inline-block;margin:0 4px 4px 0;padding:2px 8px;border-radius:999px;
            background:var(--brand-100);color:var(--brand-800);font-size:11px;font-weight:600}
          .freq{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11px;font-weight:600;
            background:var(--brand-50);color:var(--brand-800);border:1px solid var(--brand-100)}
          .muted{color:var(--muted);font-size:12.5px}
          footer{padding:0 20px 40px;color:var(--muted);font-size:12px;text-align:center}
          @media (max-width:720px){
            thead{display:none}
            tbody td{display:block;border:0;padding:4px 14px}
            tbody tr{display:block;border-bottom:1px solid var(--brand-100);padding:10px 0}
            .idx{width:auto}
          }
        </style>
      </head>
      <body>
        <header>
          <div class="wrap">
            <div class="brand">
              <span class="mark">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="#fff"
                  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M6 13.8 16 6l10 7.8" stroke-width="2.6"/>
                  <path d="M7.5 20.6h17" stroke-width="2.2" opacity="0.45"/>
                  <path d="M11 20.6a5 5 0 0 1 10 0" stroke-width="2.6"/>
                </svg>
              </span>
              <span>
                <span class="brand-name">Costa Investors</span>
                <span class="brand-sub">Sitemap</span>
              </span>
            </div>

            <h1>
              <xsl:choose>
                <xsl:when test="sm:sitemapindex">Costa Investors – XML Sitemap Index</xsl:when>
                <xsl:otherwise>Costa Investors – XML Sitemap</xsl:otherwise>
              </xsl:choose>
            </h1>
            <p class="lead">
              <xsl:choose>
                <xsl:when test="sm:sitemapindex">
                  Lista plików mapy witryny. Każdy plik zawiera do 5 000 adresów URL.
                </xsl:when>
                <xsl:otherwise>
                  Zlokalizowane adresy URL serwisu wraz z alternatywami językowymi (hreflang).
                </xsl:otherwise>
              </xsl:choose>
            </p>

            <div class="stats">
              <div class="stat">
                <b><xsl:value-of select="count(//sm:url) + count(//sm:sitemap)"/></b>
                <span>
                  <xsl:choose>
                    <xsl:when test="sm:sitemapindex">Pliki mapy</xsl:when>
                    <xsl:otherwise>Linków w pliku</xsl:otherwise>
                  </xsl:choose>
                </span>
              </div>
              <div class="stat"><b>PL · EN · ES</b><span>Języki</span></div>
              <div class="stat">
                <b><xsl:value-of select="count(//xhtml:link)"/></b>
                <span>Alternatywy hreflang</span>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div class="wrap">
            <div class="card">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>URL</th>
                    <xsl:choose>
                      <xsl:when test="sm:sitemapindex">
                        <th>Last Modified</th>
                      </xsl:when>
                      <xsl:otherwise>
                        <th>Hreflang Alternates</th>
                        <th>Last Modified</th>
                        <th>Change Frequency</th>
                        <th>Priorytet</th>
                      </xsl:otherwise>
                    </xsl:choose>
                  </tr>
                </thead>
                <tbody>
                  <xsl:choose>
                    <!-- INDEKS MAPY -->
                    <xsl:when test="sm:sitemapindex">
                      <xsl:for-each select="sm:sitemapindex/sm:sitemap">
                        <tr>
                          <td class="idx"><xsl:value-of select="position()"/></td>
                          <td>
                            <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
                          </td>
                          <td class="muted">
                            <xsl:choose>
                              <xsl:when test="sm:lastmod"><xsl:value-of select="sm:lastmod"/></xsl:when>
                              <xsl:otherwise>—</xsl:otherwise>
                            </xsl:choose>
                          </td>
                        </tr>
                      </xsl:for-each>
                    </xsl:when>

                    <!-- POJEDYNCZA MAPA -->
                    <xsl:otherwise>
                      <xsl:for-each select="sm:urlset/sm:url">
                        <tr>
                          <td class="idx"><xsl:value-of select="position()"/></td>
                          <td>
                            <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
                          </td>
                          <td>
                            <xsl:choose>
                              <xsl:when test="xhtml:link">
                                <xsl:for-each select="xhtml:link">
                                  <a class="tag" href="{@href}" title="{@href}">
                                    <xsl:value-of select="@hreflang"/>
                                  </a>
                                </xsl:for-each>
                              </xsl:when>
                              <xsl:otherwise><span class="muted">—</span></xsl:otherwise>
                            </xsl:choose>
                          </td>
                          <td class="muted">
                            <xsl:choose>
                              <xsl:when test="sm:lastmod"><xsl:value-of select="sm:lastmod"/></xsl:when>
                              <xsl:otherwise>—</xsl:otherwise>
                            </xsl:choose>
                          </td>
                          <td>
                            <xsl:choose>
                              <xsl:when test="sm:changefreq">
                                <span class="freq"><xsl:value-of select="sm:changefreq"/></span>
                              </xsl:when>
                              <xsl:otherwise><span class="muted">—</span></xsl:otherwise>
                            </xsl:choose>
                          </td>
                          <td class="muted">
                            <xsl:choose>
                              <xsl:when test="sm:priority"><xsl:value-of select="sm:priority"/></xsl:when>
                              <xsl:otherwise>—</xsl:otherwise>
                            </xsl:choose>
                          </td>
                        </tr>
                      </xsl:for-each>
                    </xsl:otherwise>
                  </xsl:choose>
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer>
          <p>
            Costa Investors · <a href="https://costainvestors.eu" style="color:#5a7186">costainvestors.eu</a>
            · wygenerowano automatycznie przy buildzie
          </p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
