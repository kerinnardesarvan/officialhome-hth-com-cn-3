// public/site-helper.js
(function() {
  'use strict';

  const SITE_CONFIG = {
    baseUrl: 'https://officialhome-hth.com.cn',
    keyword: '华体会',
    version: '1.2.0'
  };

  const TIPS_DATA = [
    { type: 'info', text: '欢迎访问我们的官方站点，点击下方卡片了解更多。' },
    { type: 'highlight', text: `当前关键词：“${SITE_CONFIG.keyword}”已激活。` },
    { type: 'guide', text: '使用桌面浏览器可获得最佳浏览体验。' }
  ];

  const BADGE_LIST = [
    { label: '官方', color: '#2c3e50' },
    { label: SITE_CONFIG.keyword, color: '#e74c3c' },
    { label: '安全', color: '#27ae60' },
    { label: '24h服务', color: '#f39c12' }
  ];

  const ACCESS_NOTES = [
    '本站不收集任何个人信息。',
    '请勿在公共网络下输入敏感信息。',
    '如遇链接失效，请刷新页面重试。'
  ];

  function createElement(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (key === 'className') {
          el.className = value;
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(el.style, value);
        } else {
          el.setAttribute(key, value);
        }
      }
    }
    if (children) {
      if (typeof children === 'string') {
        el.textContent = children;
      } else if (Array.isArray(children)) {
        children.forEach(child => {
          if (child instanceof Node) {
            el.appendChild(child);
          } else if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
          }
        });
      }
    }
    return el;
  }

  function buildTipCards() {
    const container = createElement('div', {
      className: 'site-helper-tips',
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        margin: '20px 0',
        padding: '16px',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }
    });

    TIPS_DATA.forEach(tip => {
      const card = createElement('div', {
        className: `tip-card tip-${tip.type}`,
        style: {
          flex: '1 1 200px',
          padding: '12px 16px',
          background: tip.type === 'highlight' ? '#fff3cd' : '#e9ecef',
          borderRadius: '6px',
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#212529',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }
      }, [tip.text]);
      container.appendChild(card);
    });

    return container;
  }

  function buildKeywordBadges() {
    const wrapper = createElement('div', {
      className: 'site-helper-badges',
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        margin: '16px 0',
        padding: '12px',
        background: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #ced4da'
      }
    });

    BADGE_LIST.forEach(badge => {
      const span = createElement('span', {
        className: 'keyword-badge',
        style: {
          display: 'inline-block',
          padding: '4px 12px',
          background: badge.color,
          color: '#ffffff',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.5px'
        }
      }, [badge.label]);
      wrapper.appendChild(span);
    });

    return wrapper;
  }

  function buildAccessGuide() {
    const section = createElement('div', {
      className: 'site-helper-access',
      style: {
        margin: '16px 0',
        padding: '16px',
        background: '#f1f3f5',
        borderRadius: '8px',
        borderLeft: '4px solid #0d6efd'
      }
    });

    const title = createElement('h4', {
      style: {
        margin: '0 0 12px 0',
        fontSize: '16px',
        color: '#0d6efd'
      }
    }, ['访问说明']);

    const list = createElement('ul', {
      style: {
        margin: 0,
        paddingLeft: '20px',
        listStyle: 'disc'
      }
    });

    ACCESS_NOTES.forEach(note => {
      const li = createElement('li', {
        style: {
          marginBottom: '6px',
          fontSize: '14px',
          color: '#495057'
        }
      }, [note]);
      list.appendChild(li);
    });

    section.appendChild(title);
    section.appendChild(list);
    return section;
  }

  function buildFooterLink() {
    const link = createElement('a', {
      href: SITE_CONFIG.baseUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      style: {
        display: 'inline-block',
        marginTop: '12px',
        padding: '8px 16px',
        background: '#0d6efd',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'background 0.2s'
      }
    }, [`前往 ${SITE_CONFIG.keyword} 官网`]);

    link.addEventListener('mouseenter', function() {
      this.style.background = '#0b5ed7';
    });
    link.addEventListener('mouseleave', function() {
      this.style.background = '#0d6efd';
    });
    return link;
  }

  function initSiteHelper() {
    const container = createElement('div', {
      id: 'site-helper-root',
      style: {
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }
    });

    container.appendChild(buildTipCards());
    container.appendChild(buildKeywordBadges());
    container.appendChild(buildAccessGuide());
    container.appendChild(buildFooterLink());

    const target = document.getElementById('site-helper-mount') || document.body;
    target.appendChild(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteHelper);
  } else {
    initSiteHelper();
  }
})();