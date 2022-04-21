
SYSNAM   = observers/portal
VERNUM   = $(shell basename `pwd`)
#override VERNUM = 0.0.0
BUILDDIR = build
RELDIR   = /www/$(SYSNAM)/$(VERNUM)

install:
        @echo "rsync -abvhHS --recursive $(BUILDDIR)/ /$(RELDIR)/"
        rsync -abvhHS --recursive $(BUILDDIR)/ /$(RELDIR)/
        cd $(RELDIR)/..; rm rel; ln -s $(VERNUM) rel;
