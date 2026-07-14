---
layout: default
# Story-focused career timeline page.
---
{%- include multi_lng/get-lng-by-url.liquid -%}
{%- assign lng = get_lng -%}
{%- assign journey_data = page.page_data | default: site.data.content.journey[lng].page_data -%}
{%- comment -%} Ongoing entries lead; completed entries sort by end date, then start date. {%- endcomment -%}
{%- assign ongoing_entries = journey_data.timeline | where_exp: "entry", "entry.end_date == 'Present'" | sort: "start_date" | reverse -%}
{%- assign completed_entries = journey_data.timeline | where_exp: "entry", "entry.end_date != 'Present'" | sort: "start_date" | sort: "end_date" | reverse -%}
{%- assign journey_entries = ongoing_entries | concat: completed_entries -%}
{%- assign axis_start = journey_data.main.axis_start_date -%}
{%- assign axis_end = journey_data.main.axis_end_date -%}
{%- if axis_end == "Present" -%}{%- assign axis_end = site.time -%}{%- endif -%}
{%- assign axis_start_month = axis_start | date: "%m" | plus: 0 -%}
{%- assign axis_start_index = axis_start | date: "%Y" | times: 12 | plus: axis_start_month -%}
{%- assign axis_end_month = axis_end | date: "%m" | plus: 0 -%}
{%- assign axis_end_index = axis_end | date: "%Y" | times: 12 | plus: axis_end_month -%}
{%- assign axis_month_count = axis_end_index | minus: axis_start_index | plus: 1 -%}
{%- assign axis_start_year = axis_start | date: "%Y" | plus: 0 -%}
{%- assign axis_end_year = axis_end | date: "%Y" | plus: 0 -%}

<section class="journey" aria-labelledby="journey-title">
  <header class="multipurpose-container journey-intro">
    <p class="journey-eyebrow">{{ journey_data.main.eyebrow | default: "My path so far" }}</p>
    <h1 id="journey-title">{{ journey_data.main.header | default: "Journey" }}</h1>
    {%- if journey_data.main.info %}
      <div class="journey-intro-copy markdown-style">{{ journey_data.main.info | markdownify }}</div>
    {%- endif %}
  </header>

  {%- assign axis_height = axis_month_count | times: 20 -%}
  <div class="journey-timeline journey-timeline--desktop" style="--journey-axis-height: {{ axis_height }}px;">
    <div class="journey-axis" aria-hidden="true">
      {%- for year in (axis_start_year..axis_end_year) %}
        {%- assign tick_index = year | times: 12 | plus: 1 -%}
        {%- if tick_index >= axis_start_index and tick_index <= axis_end_index %}
          {%- assign tick_offset = axis_end_index | minus: tick_index -%}
          {%- assign tick_position = tick_offset | times: 100.0 | divided_by: axis_month_count -%}
          <time class="journey-axis-tick" style="--axis-position: {{ tick_position }}%;">{{ year }}</time>
        {%- endif %}
      {%- endfor %}
    </div>
    {%- for entry in journey_entries %}
      {%- assign effective_end = entry.end_date -%}
      {%- if effective_end == "Present" -%}{%- assign effective_end = axis_end -%}{%- endif -%}
      {%- assign entry_start_month = entry.start_date | date: "%m" | plus: 0 -%}
      {%- assign entry_start_index = entry.start_date | date: "%Y" | times: 12 | plus: entry_start_month -%}
      {%- assign entry_end_month = effective_end | date: "%m" | plus: 0 -%}
      {%- assign entry_end_index = effective_end | date: "%Y" | times: 12 | plus: entry_end_month -%}
      {%- assign entry_offset = axis_end_index | minus: entry_end_index -%}
      {%- assign entry_span = entry_end_index | minus: entry_start_index | plus: 1 -%}
      {%- assign entry_top = entry_offset | times: 100.0 | divided_by: axis_month_count -%}
      {%- assign entry_height = entry_span | times: 100.0 | divided_by: axis_month_count -%}
      <div class="journey-duration-entry journey-duration-entry--{{ entry.type }}" style="--timeline-top: {{ entry_top }}%; --timeline-height: {{ entry_height }}%;">
        <div class="journey-duration-rail" aria-hidden="true"></div>
        <div class="journey-card-anchor">
          {% include journey/timeline-card.html entry=entry %}
        </div>
      </div>
    {%- endfor %}
  </div>

  <div class="journey-timeline journey-timeline--mobile">
    {%- for entry in journey_entries %}
      <div class="journey-mobile-entry journey-mobile-entry--{{ entry.type }}">
        {% include journey/timeline-card.html entry=entry %}
      </div>
    {%- endfor %}
  </div>
</section>
